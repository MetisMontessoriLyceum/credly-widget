'use strict'

const express = require('express')
const router = express.Router()
const credly = require('../lib/credly')
const ty = require('then-yield').using(Promise.cast)
// const _ = require('lodash')

/**
 * requests all the badges of the members who where given the badges.
 * @param  {Array} badges All the badges are requested for every user in the
 *                        array.
 * @return {Array}        Each item contains all of the users badges.
 */
function getBadgesOfMembersWithBadge (badges) {
  const promises = badges.map(badge =>
    credly.request(`/members/${badge.member_id}/badges`))

  return Promise.all(promises)
}

function orderCreatedBadges (createdBadges, firstBadge) {
  return createdBadges.concat().sort(function (a, b) {
    if (a.id.toString() === firstBadge) return -1
    else if (b.id.toString() === firstBadge) return 1
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })
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

router.get('/:issuerId/:badgeId', ty.async(function* (req, res, err) {
  // example issuerId: 2221531
  // example badgeId: 86319

  try {
    const issuerId = yield credly.resolveUserId(req.params.issuerId)

    const promises = [
      // issuerCreatedBadges
      credly.request(`/members/${issuerId}/badges/created?per_page=100`),
      // issuerGivenBadges
      credly.request(`/members/${issuerId}/badges/given?per_page=100`)
    ]

    Promise.all(promises).then(ty.async(function* (apiRes) {
      const issuerCreatedBadges =
          orderCreatedBadges(apiRes[0], req.params.badgeId)
          .map(credly.fixImageOfBadge)
      const issuerGivenBadges = apiRes[1]

      const givenMasterBadges = issuerGivenBadges
          .filter(badge => badge.badge_id.toString() === req.params.badgeId)
      const badgesOfMembersWithMasterBadge =
          yield getBadgesOfMembersWithBadge(givenMasterBadges)

      const returnObj = {
        badges: issuerCreatedBadges,
        rows: badgesOfMembersWithMasterBadge.map(badgesOfMember => ({
          name: badgesOfMember[0].member.display_name,
          hasBadges: []
        }))
      }

      issuerCreatedBadges.forEach((issuerCreatedBadge, createdBadgeIndex) => {
        badgesOfMembersWithMasterBadge.forEach((badgesOfMember,
                                                badgesOfMemberIndex) => {
          const matchingBadges = badgesOfMember.filter(badge =>
            badge.badge_id === issuerCreatedBadge.id)
          if (matchingBadges.length > 0) {
            returnObj.rows[badgesOfMemberIndex]
                .hasBadges[createdBadgeIndex] = true
          } else {
            returnObj.rows[badgesOfMemberIndex]
                .hasBadges[createdBadgeIndex] = false
          }
        })
      })
      // res.json(returnObj)
      res.render('table', returnObj)
    }))
  } catch (e) {
    err(e)
  }
}))

module.exports = router
