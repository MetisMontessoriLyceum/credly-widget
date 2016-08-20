const request = require('request');
const cache = require('memory-cache');

const options = require('../credly_options.json')

module.exports.request = (url) => {
  return new Promise(function(resolve, reject) {
    url = 'https://api.credly.com/v1.1'+url;
    if (cache.get(url)) {
      resolve(cache.get(url))
      return
    }

    request(url,options,(error, response, body) => {
      // console.log({error,body});
      if (error) {
        reject(error)
      }
      let data = JSON.parse(body).data
      cache.put(url,data,600000) // 10minuts
      resolve(JSON.parse(body).data)
    })
  })
}
