'use strict'

const express = require('express')
const router = express.Router()
const credly = require('../lib/credly')

router.get('/:issuerId', function (req, res, err) {
  // example issuerId: 2221531
  credly.resolveUserId(req.params.issuerId).then(issuerId => {
    credly.request(`/members/${issuerId}/badges/given?per_page=5`).then(latestBadges => {
      res.json(latestBadges)
    })
  })
})

module.exports = router
