let express = require('express')
let router = express.Router()
let credly = require('../lib/credly')

function sortByLength (array) {
  return array.sort((a, b) => b.length - a.length)
}

/**
 * requests all the badges of the members who where given the badges.
 * @param  {Array} badges All the badges are requested for every user in the
 *                        array.
 * @return {Array}        Each item contains all of the users badges.
 */
function getBadgesOfMembers (badges) {
  const promises = badges.map(badge =>
    credly.request(`/members/${badge.member_id}/badges`))

  return Promise.all(promises)
}

/**
 * generates a ranking table.
 *
 * This router will look up witch users have a spesific badge, and rank them
 * based on how manny badges they got from {:id}.
 *
 * @param {NumberOfString} id the userId or slag of the user who gave the
 *                            identifying badge.
 * @param {String} badge      the badge name used to identify the users to
 *                            rank.
 */
router.get('/:id/:badge', function (req, res, next) {
  credly.resolveUserId(req.params.id).then(issuerId => {
    credly.request(`/members/${issuerId}/badges/given`)
      .then(badges => badges.filter(badge => badge.title === req.params.badge))
      .then(getBadgesOfMembers)
      .then(badgesOfMembers => badgesOfMembers.map(
        badges => badges.filter(badge => badge.issuer.id === issuerId)
      ))
      .then(sortByLength)
      .then(badgesOfMembers => {
        res.render('ranking', {badgesOfMembers})
      })
      .catch(console.error)
  })
})

module.exports = router
