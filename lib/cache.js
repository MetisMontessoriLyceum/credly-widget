const redis = require('redis').createClient({ host: process.env.REDIS_HOST || '127.0.0.1' })
const git = require('git-rev')
let HEAD

redis.on('error', function (err) {
  console.error(err)
})

function getHEAD () {
  return new Promise((resolve) => {
    if (HEAD) {
      resolve(HEAD)
    } else {
      git.long(function (str) {
        HEAD = str
      })
      resolve(HEAD)
    }
  })
}

function put (url, data) {
  return new Promise((resolve, reject) => {
    getHEAD().then(HEAD => {
      redis.set(`credly-widget:${HEAD}:cache:${url}`, JSON.stringify(data), (err) => {
        if (err) {
          reject(err)
          return
        }

        // expire in 10 minutes
        redis.expire(`credly-widget:${HEAD}:cache:${url}`, 6000, (err) => {
          if (err) {
            reject(err)
            return
          }

          resolve()
        })
      })
    })
  })
}

function has (url) {
  return new Promise((resolve, reject) => {
    getHEAD().then(HEAD => {
      redis.exists(`credly-widget:${HEAD}:cache:${url}`, (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        if (reply === 1) {
          resolve()
        } else {
          reject()
        }
      })
    })
  })
}

function get (url) {
  return new Promise((resolve, reject) => {
    getHEAD().then(HEAD => {
      redis.get(`credly-widget:${HEAD}:cache:${url}`, (err, reply) => {
        if (err) {
          reject(err)
          return
        }
        resolve(JSON.parse(reply))
      })
    })
  })
}

module.exports = { put, has, get }
