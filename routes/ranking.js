let express = require('express')
let router = express.Router()
let credly = require('../lib/credly')

// This allows us to use the es2016 await. for more info see
// https://github.com/yortus/asyncawait
let async = require('asyncawait/async')
let await = require('asyncawait/await')

/**
 * resolveUserId - resolves the user id or a slag in a credly user id.
 *
 * @param  {string or number} userId The user id or the slag of a credly user.
 * @return {number} the user id of a credy user.
 */
function resolveUserId(userId) {
  return new Promise(function(resolve, reject) {
    if (parseInt(userId) === NaN) {
      resolve(parseInt(userId))
    }
    else {
      credly.request(`/members/${userId}`).then(data => {
        resolve(data.id)
      })
    }
  })
}

/**
 * GET /ranking/:id/:badge - generates a ranking table.
 *
 * This router will look up witch users have a spesific badge, and rank them
 * based on how manny badges they got from {:id}.
 *
 * @param {:id} the userId or slag of the user who gave the identifying badge.
 * @param {:badge} the badge name used to identify the users to rank.
 */
router.get('/:id/:badge', async (function(req, res, next) {

  // The credly api only allows a user id, if a slag was given, resolve
  // into a user id.
  let identifyingUserId = await (resolveUserId(req.params.id))
  let identifyingBadgeTitle = req.params.badge
  let badgesGiven =
      await (credly.request(`/members/${identifyingUserId}/badges/given`))
  let resJson = []
  let users = []
  badgesGiven
    .filter(badge => badge.title === identifyingBadgeTitle)
    .forEach(badge => {
      users.push(badge.member)
    })

  // We now have identifyed with users to rank, request the badges of these
  // users.
  let badgesOfMatchingUsersPromises =
      users.map(user => credly.request(`/members/${user.id}/badges`))
  let badgesOfMatchingUsers = await (badgesOfMatchingUsersPromises)

  // Format the data.
  let data = {users: []}
  for (let userIndex=0; userIndex<badgesOfMatchingUsers.length; userIndex++) {
    let userBadges = badgesOfMatchingUsers[userIndex]
    data.users.push({
      name: users[userIndex].display_name,
      badges: userBadges,
      badgesFromIdentifyingUser: userBadges.filter(badge =>
          badge.issuer.id == identifyingUserId)
    })
  }
  data.users.sort((a, b) =>
      b.badgesFromIdentifyingUser.length - a.badgesFromIdentifyingUser.length)
  res.render('ranking', data)

}))

module.exports = router
