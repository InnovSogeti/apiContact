const DB = require('../../db')
const COLLECTION = 'contact'
var sanitize = require('mongo-sanitize');
var ObjectID = require('mongodb').ObjectID;

module.exports = class ContactPersistence {


    /**
     * Enregistre un visiteur
     * @param {*} visiteur
     * @param {*} callback
     */
    save(contact, callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).insertOne(contact, function (err, docs) {
            if (err) return cb(err)
            callback("200", docs.ops[0]._id)
        });
    }

    updateContact(id_contact, req, callback){
      var db = DB.getDB()
      var query = {
        _id: new ObjectID(sanitize(id_contact))
      }
      db.collection(COLLECTION).update(query, req,function(err,doc){
          callback(err,doc)})
    }

    getContactsParSalon(id,callback){
        var db = DB.getDB()
        db.collection(COLLECTION).find({ id_salon: id }).toArray(function (err, results) {
            if (err) {
                callback(err,null);
            } else {
                callback(null, results);
            }
        });
    }

    // Renvoie la liste des contacts
    getAllContacts(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find().toArray(function(err,doc){
            callback(err,doc)
        })
    }

}
