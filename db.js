var MongoClient = require('mongodb').MongoClient
  , async = require('async')

var state = {
  db: null,
  mode: null,
}

// In the real world it will be better if the production uri comes
// from an environment variable, instead of being hard coded.
var PRODUCTION_URI = 'mongodb://127.0.0.1:27017/production'
  , TEST_URI = 'mongodb://127.0.0.1:27017/test'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

/**
 * connect - to connect to either the production or the test database
 * @param {*} mode 
 * @param {*} done 
 */
exports.connect = function(mode, done) {
  if (state.db) return done()

  var uri = mode === exports.MODE_TEST ? TEST_URI : PRODUCTION_URI

  MongoClient.connect(uri, function(err, db) {
    if (err) return done(err)
    state.db = db
    state.mode = mode
    done()
  })
}

/**
 * getDB - to get an active database connection
 */
exports.getDB = function() {
  return state.db
}

/**
 * drop - to clear all collections in the database
 * @param {*} done 
 */
exports.drop = function(done) {
  if (!state.db) return done()
  // This is faster then dropping the database
  state.db.collections(function(err, collections) {
    async.each(collections, function(collection, cb) {
      if (collection.collectionName.indexOf('system') === 0) {
        return cb()
      }
      collection.remove(cb)
    }, done)
  })
}

/**
 * fixtures - load data from a JSON structure into the database
 * @param {*} data 
 * @param {*} done 
 */
exports.fixtures = function(data, done) {
  var db = state.db
  if (!db) {
    return done(new Error('Missing database connection.'))
  }

  var names = Object.keys(data.collections)
  async.each(names, function(names, cb) {
    db.createCollection(names, function(err, collection) {
      if (err) return cb(err)
      collection.insert(data.collections[names], cb)
    })
  }, done)
}