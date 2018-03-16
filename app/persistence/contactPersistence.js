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
}
