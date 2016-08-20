const request = require('request')
const cache = require('memory-cache')

const options = require('../credly_options.json')

/**
 * resolves the user id or a slag in a credly user id.
 * @param  {StringOrNumber} userId The user id or the slag of a credly user.
 * @return {Number}                The user id of a credy user.
 */
module.exports.resolveUserId = function (userId) {
  return new Promise((resolve, reject) => {
    if (!isNaN(parseInt(userId))) {
      resolve(parseInt(userId))
    } else {
      exports.request(`/members/${userId}`).then(data => {
        resolve(data.id)
      })
    }
  })
}

/**
 * request the users badges from the credly server
 * @param  {Number} userId the id of the user who you want the badges from
 * @return {Object}        An object with the name of the user and his badges.
 */
module.exports.getUserBadges = function (userId) {
  return new Promise(function (resolve, reject) {
    const apiPromises = [
      exports.request(`/members/${userId}`),
      exports.request(`/members/${userId}/badges`)
    ]

    Promise.all(apiPromises)
      .then(apiRes => {
        resolve({
          name: apiRes[0].display_name,
          badges: apiRes[1]
        })
      })
      .catch(reject)
  })
}

/**
 * send a GET request to the credly api
 * @param  {String} endPoint the endpoint of the request, for example:
 *                           `/members/24535/badges`
 * @return {Object}          the data object of the response json
 */
module.exports.request = (endPoint) => {
  return new Promise(function (resolve, reject) {
    const url = 'https://api.credly.com/v1.1' + endPoint

    if (cache.get(url)) {
      resolve(cache.get(url))
    } else {
      request(url, options, (err, response, body) => {
        if (err) {
          reject(err)
        } else if (response.statusCode >= 400 && response.statusCode <= 599) {
          reject(new Error(`${response.statusCode}: ${response.statusMessage}`))
        }

        const data = JSON.parse(body).data
        cache.put(url, data, 600000) // 10minuts
        resolve(data)
      })
    }
  })
}
