/* global describe it */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

const proxyquire = require('proxyquire')

// keep credly.js in the cache.
require('../lib/credly')

describe('credly.js', function () {
  describe('#request', function () {
    it('should correctly parse json', function () {
      const credly = proxyquire('../lib/credly', {
        request: function (url, options, callback) {
          callback(null, {statusCode: 200}, '{"data":{"foo":"bar"}}')
        },
        'memory-cache': {
          get: function () {},
          put: function () {}
        }
      })

      return credly.request('/foo').should.eventually.deep.equal({foo: 'bar'})
    })

    it('should reject when request fails', function () {
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

    it('should reject on error status code', function () {
      const credly = proxyquire('../lib/credly', {
        request: function (url, options, callback) {
          callback(null, {statusCode: 404, statusMessage: 'Not Found'})
        },
        'memory-cache': {
          get: function () {},
          put: function () {}
        }
      })

      return credly.request('/foo').should.be.rejected
    })

    it('should resolve the second time under 20ms', function (done) {
      const credly = proxyquire('../lib/credly', {
        request: function (url, options, callback) {
          setTimeout(function () {
            callback(null, {statusCode: 200}, '{"data":{"foo":"bar"}}')
          }, 50)
        }
      })

      this.slow('200ms')
      let startTime, endTime

      credly.request('/foo')
      .then(function () {
        startTime = new Date().getTime()

        return credly.request('/foo')
      })
      .then(function () {
        endTime = new Date().getTime()

        if (endTime - startTime < 20) {
          done()
        } else {
          done(new Error(`the second request took ${endTime - startTime}ms`))
        }
      })
    })
  })
})
