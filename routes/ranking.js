const express = require('express')
const router = express.Router()
const credly = require('../lib/credly')
const ty = require('then-yield').using(Promise.cast)
const _ = require('lodash')

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
// router.get('/:id/:badge', function (req, res, next) {
//   credly.resolveUserId(req.params.id).then(issuerId => {
//     credly.request(`/members/${issuerId}/badges/given`)
//       .then(badges => badges.filter(badge => badge.title === req.params.badge))
//       .then(getBadgesOfMembers)
//       .then(badgesOfMembers => badgesOfMembers.map(
//         badges => badges.filter(badge => badge.issuer.id === issuerId)
//       ))
//       .then(sortByLength)
//       .then(badgesOfMembers => {
//         res.render('ranking', {badgesOfMembers})
//       })
//       .catch(console.error)
//   })
// })

// router.get('/:issuerId/:badge', function (req, res, err) {
//   credly.resolveUserId(req.params.issuerId).then(issuerId => {
//     credly.request(`/members/${issuerId}/badges/given`)
//       .then(badges => badges.filter(badge => badge.title === req.params.badge))
//       .then(getBadgesOfMembers)
//       .then(badgesOfMembers => badgesOfMembers.map(
//         badges => badges.filter(badge => badge.issuer.id === issuerId)
//       ))
//       .then(data => [].concat.apply([], data))
//       .then(data => data.map(item => {
//         item.dateGiven = new Date(item.distributed_at).getTime()
//         return item
//       }))
//       .then(data => data.concat().sort((a, b) => b.dateGiven - a.dateGiven))
//       .then(data => data.slice(0, 10))
//       .then(data => {
//         res.render('badges', {
//           user: {
//             name: 'CoderClass',
//             badges: data
//           }
//         })
//       })
//       .catch(data => { err(data) })
//   })
// })

router.get('/:issuerId/:badge', ty.async(function* (req, res, err) {
  try {
    const issuerId = yield credly.resolveUserId(req.params.issuerId)
    const givenIndentifierBadges = _(yield credly.request(`/members/${issuerId}/badges/given`))
      .filter(badge => badge.title === req.params.badge)

    const badgesOfMembers = _(yield getBadgesOfMembers(givenIndentifierBadges))
      .flatten()
      .map(item => {
        item.dateGiven = new Date(item.distributed_at).getTime()
        return item
      })
      .sort((a, b) => b.dateGiven - a.dateGiven)
      .take(10)
      .value()

    res.render('badges', { user: {
      name: 'CoderClass',
      badges: badgesOfMembers
    }})
  } catch (e) {
    err(e)
  }
}))

module.exports = router
