var MongoClient = require('mongodb').MongoClient
  , async = require('async')

var state = {
  db: null,
  mode: null,
}

// In the real world it will be better if the production uri comes
// from an environment variable, instead of being hard coded.
const PRODUCTION_URI = 'mongodb://' + process.env.MONGO_URL + '/contactrh'
    , TEST_URI = 'mongodb://127.0.0.1:27017/test'

const DEFAULT_USER = process.env.defaultUser ? process.env.defaultUser : "admin"
    , DEFAULT_PWD = process.env.defaultPwd ? process.env.defaultPwd : "admin"


exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

/**
 * connect - to connect to either the production or the test database
 * @param {*} mode 
 * @param {*} done 
 */
exports.connect = function(done) {
  if (state.db) return done()

  // par defaut ce met en mod test
  var uri = TEST_URI;
  var mode = exports.MODE_TEST;

  // passe en mode PRODUCTION si la variable d'environnement "MONGO_URL" est définie
  if (process.env.MONGO_URL) {
    uri = PRODUCTION_URI;
    mode = exports.MODE_PRODUCTION;
  }
  console.log(mode);

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