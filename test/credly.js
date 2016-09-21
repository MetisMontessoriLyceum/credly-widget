/* global describe it */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

const proxyquire = require('proxyquire')

// keep credly.js in the cache.
require('../lib/credly')

describe('credly.js', function () {
  describe('#resolveUserId', function () {
    it('should return userId if userId is a string with a number in it', function () {
      const credly = require('../lib/credly')
      return credly.resolveUserId('1234').should.eventually.equal(1234)
    })

    it('should return userId if userId is a number', function () {
      const credly = require('../lib/credly')
      return credly.resolveUserId(1234).should.eventually.equal(1234)
    })

    it('should resolve a slag correctly', function () {
      const credly = proxyquire('../lib/credly', {
        request: function (url, options, callback) {
          callback(null, {statusCode: 200}, '{"data":{"id":1234}}')
        }
      })
      return credly.resolveUserId('foo').should.eventually.equal(1234)
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
      return credly.resolveUserId('foo').should.be.rejectedWith(error)
    })
  })

  describe('#getUserBadges', function () {
    it('should put the display_name in the name property', function () {
      const credly = proxyquire('../lib/credly', {
        request: function (url, options, callback) {
          callback(null, {statusCode: 200}, `{"data": {
            "display_name":"Mr. Foo"
          }}`)
        },
        'memory-cache': {
          get: function () {},
          put: function () {}
        }
      })

      return credly.getUserBadges(1234)
          .should.eventually.have.property('name').and.equal('Mr. Foo')
    })

    it('should get the badges', function () {
      const credly = proxyquire('../lib/credly', {
        request: function (url, options, callback) {
          if (url === 'https://api.credly.com/v1.1/members/1234') {
            callback(null, {statusCode: 200}, `{"data": {
              "display_name":"Mr. Foo"
            }}`)
          } else {
            callback(null, {statusCode: 200}, `{"data": {
              "foo": "bar",
              "baz": "foo"
            }}`)
          }
        },
        'memory-cache': {
          get: function () {},
          put: function () {}
        }
      })

      return credly.getUserBadges(1234).should.eventually
          .have.property('badges').and.deep.equal({foo: 'bar', baz: 'foo'})
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
      return credly.getUserBadges(1234).should.be.rejectedWith(error)
    })
  })

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

    it('should reject on invalid json', function () {
      const credly = proxyquire('../lib/credly', {
        request: function (url, options, callback) {
          callback(null, {statusCode: 200}, `hi there!`)
        },
        'memory-cache': {
          get: function () {},
          put: function () {}
        }
      })
      return credly.request('/foo').should.be.rejected
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
  })
})
