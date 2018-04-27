const DB = require('../../db')
const COLLECTION = 'users'
var sanitize = require('mongo-sanitize');
var ObjectID = require('mongodb').ObjectID;

module.exports = class UsersPersisence {


  checkPassword(req, callback) {
    var db = DB.getDB()

    var query = {
        login: sanitize(req.login),
        pwd: sanitize(req.pwd)
    }

    db.collection(COLLECTION).findOne(query, function(err,infoUser){
          callback(err,infoUser)
      })
}

    update(id_user, req, callback){
      var db = DB.getDB()
      var query = {
          _id: new ObjectID(sanitize(id_user))
      }
      db.collection(COLLECTION).update(query, req,function(err,doc){
          callback(err,doc)})
      // db.collection(COLLECTION).findOne(query,function(err,doc){
      //     callback(err,doc)
      // })
    }

    // Renvoie la liste des utilisateurs
    getAllUsers(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find().toArray(function(err,doc){
            callback(err,doc)
        })
    }


    //Find l'utilisateur qui correspondant à idUsers
    getUsers(idUsers, callback) {
        var query={
            _id: new ObjectID(sanitize(idUsers))
        }
        console.log(query);
        var db = DB.getDB()
        db.collection(COLLECTION).findOne(query,function(err,doc){
            callback(err,doc)
        })
    }

    /**
     * Suppression d'un user
     */
    delete(idUsers, callback) {
        console.log("DB : Suppression d'un utilisateur' : "+idUsers);
        var db = DB.getDB()
        var query={
            _id: new ObjectID(sanitize(idUsers))
        }
        db.collection(COLLECTION).remove(query, function(err,doc){
            if(err) console.log("DB : log : "+err);
            callback(err)
        })
    }

    /**
     * Enregistre un user
     */
    save(users, callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).insertOne(users, function (err, docs) {
            if (err) return callback(err)
            callback("200", docs.ops[0]._id)
        });
    }


}
