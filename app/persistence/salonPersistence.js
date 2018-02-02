const DB = require('../../db')
const COLLECTION = 'salons'
var sanitize = require('mongo-sanitize');
var ObjectID = require('mongodb').ObjectID;

module.exports = class SalonPersistence {

    //Find le salon correspondant à idSalon
    getSalon(idSalon, callback) {
        var query={
            id_salon: sanitize(idSalon)
        }
        console.log(query);
        var db = DB.getDB()
        db.collection(COLLECTION).findOne(query,function(err,doc){
            callback(err,doc)
        })
    }


    // Renvoie la liste des salons 
    getAllSalons(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find().toArray(function(err,doc){
            callback(err,doc)
        })
    }

    /**
     * Suppression d'un salon
     */
    delete(idSalon, callback) {
        console.log("DB : Suppression du salon : "+idSalon);
        var db = DB.getDB()
        var query={
            _id: new ObjectID(sanitize(idSalon))
        }
        //db.collection(COLLECTION).remove(query, (err, item) => {
        //    callback(err);
        //})
        db.collection(COLLECTION).remove(query, function(err,doc){
            if(err) console.log("DB : log : "+err);
            callback(err)
        })
    }
    

    

    /**
     * Enregistre un salon
     */
    save(salon, callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).insert({
            "nom": salon.nom,
            "ville": salon.ville,
            "date_debut": salon.date_debut,
            "date_fin": salon.date_fin,
            "description": salon.description,
            "id_salon": salon.id_salon
        }, function (err, doc) {
            if (err) return callback(err)
            callback("200", doc.ops[0]._id)
        })
    }

    get_a_day(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find({}).toArray(function (err, results) {
            if (err) {
                return null;
            } else {
                var i = 0;
                var cpt = 0;
                while (results[i]) {
                    if ((Date.now() >= Date.parse(results[i].date_debut)) && (Date.now() <= Date.parse(results[i].date_fin))) {
                        cpt++;
                    }
                    i++;
                }
                cpt = cpt.toString();
                callback(null, cpt);
            }
        });

    }


    get_today(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find().toArray(function (err, results) {
            if (err) {
                return null;
            } else {
                var i = 0;
                var cpt;
                while (results[i]) {
                    if ((Date.now() >= Date.parse(results[i].date_debut)) && (Date.now() < Date.parse(results[i].date_fin))) {
                        cpt = results[i];
                    }
                    i++;
                }
                callback(null, cpt);
            }
        });

    }
}
