const express = require('express')
const router = express.Router()
const credly = require('../lib/credly')
const ty = require('then-yield').using(Promise.cast)

router.get('/:issuerId/:badgeId', ty.async(function* (req, res, err) {
  const issuerId = yield credly.resolveUserId(req.params.issuerId)
  const badgeId = req.params.badgeId

  // example issuerId: 2221531
  // example badgeId: 99999 // yes, we actualy got this id by pure luck.

  const badgesGiven =
      (yield credly.request(`/members/${issuerId}/badges/given?per_page=100`))
      .filter(badge => badge.badge_id.toString() === badgeId)

  if (badgesGiven.length === 0) {
    res.render('badge-details', { badge: { name: 'Unknown' } })
    return
  }

  const badge = {
    name: badgesGiven[0].title,
    given: badgesGiven
  }

  res.render('badge-details', { badge })
}))

module.exports = router
