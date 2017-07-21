const request = require('request')
const cache = require('./cache')
const debug = require('debug')('credly-widget:api')

const options = require('../credly_options.json')

/**
 * resolves the user id or a slag in a credly user id.
 * @param  {StringOrNumber} userId The user id or the slag of a credly user.
 * @return {Number}                The user id of a credy user.
 */
module.exports.resolveUserId = function (userId) {
  return new Promise((resolve, reject) => {
    if (!isNaN(parseInt(userId))) {
      resolve({id: parseInt(userId)})
    } else {
      resolve(exports.request(`/members/${userId}`))
    }
  }).then(data => data.id)
}

/**
 * request the users badges from the credly server
 * @param  {Number} userId the id of the user who you want the badges from
 * @return {Object}        An object with the name of the user and his badges.
 */
module.exports.getUserBadges = function (userId, shouldCache) {
  return Promise.all([
    exports.request(`/members/${userId}`, shouldCache),
    exports.request(`/members/${userId}/badges?per_page=255`, shouldCache)
  ]).then(([user, badges]) => ({
    name: user.display_name,
    user,
    badges
  }))
}

module.exports.fixImageOfBadge = function (badge) {
  const badgeURLSplit = badge.image_url.split('.')
  badgeURLSplit[3] = badgeURLSplit[3] + '_13'
  return {
    id: badge.id,
    image_url: badgeURLSplit.join('.'),
    title: badge.title,
    description: badge.description
  }
}

/**
 * send a GET request to the credly api
 * @param  {String} endPoint the endpoint of the request, for example:
 *                           `/members/24535/badges`
 * @return {Object}          the data object of the response json
 */
module.exports.request = (endPoint, shouldCache) => {
  return new Promise(function (resolve, reject) {
    const endPointPrepend = 'https://api.credly.com/v1.1'

    if (shouldCache == null) shouldCache = true
    if (endPoint.indexOf(endPointPrepend) === 0) {
      endPoint = endPoint.substring(endPointPrepend.length)
    }

    const url = endPointPrepend + endPoint

    cache.has(url)
      .then(() => {
        debug(`${endPoint} (from cache)`)
        resolve(cache.get(url))
      })
      .catch(() => {
        debug(`${endPoint}`)
        request(url, options, (err, response, body) => {
          if (err) {
            reject(err)
          } else if (response.statusCode >= 400 && response.statusCode <= 599) {
            reject(new Error(`${response.statusCode}: ${response.statusMessage}`))
          }

          const data = JSON.parse(body).data
          if (shouldCache) {
            cache.put(url, data).then(() => {
              resolve(data)
            })
          }
        })
      })
  })
}
