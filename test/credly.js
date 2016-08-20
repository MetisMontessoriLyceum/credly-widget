const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

const proxyquire = require('proxyquire')

// This allows us to use the es2016 await. for more info see
// https://github.com/yortus/asyncawait
const async = require('asyncawait/async')
const await = require('asyncawait/await')

// keep credly.js in the cache.
require('../lib/credly')

describe('credly.js', function () {

  it('should correctly parse json',function () {
    const credly = proxyquire('../lib/credly', {
      request: function (url, options, callback) {
        callback(null,null,'{"data":{"foo":"bar"}}')
      },
      'memory-cache': {
        get: function () {},
        put: function () {}
      }
    })

    return credly.request('/foo').should.eventually.deep.equal({foo:"bar"})
  })

  it('should reject when request fails',function () {
    const error = new Error('Something went wrong.')
    const credly = proxyquire('../lib/credly', {
      request: function (url, options, callback) {
        callback(error)
      },
      'memory-cache': {
        get: function () {},
        put: function () {}
      }
    })
    return credly.request('/foo').should.be.rejectedWith(error)
  })


  it('should resolve the second time under 20ms',function (done) {
    const credly = proxyquire('../lib/credly', {
      request: function (url, options, callback) {
        setTimeout(function () {
          callback(null,null,'{"data":{"foo":"bar"}}')
        },50)
      }
    })

    this.slow('200ms')
    let startTime, endTime;

    credly.request('/foo')
      .then(function () {
        startTime = new Date().getTime()

        return credly.request('/foo')
      })
      .then(function () {
        endTime = new Date().getTime()

        if (endTime-startTime < 20) {
          done()
        } else {
          done(new Error(`the second request took ${endTime-startTime}ms`))
        }
      })
  })

})
