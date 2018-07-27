const DB = require('../../db')
const COLLECTION = 'salon'
var sanitize = require('mongo-sanitize');
var ObjectID = require('mongodb').ObjectID;

module.exports = class SalonPersistence {

    //Find le salon correspondant à idSalon
    getSalon(idSalon, callback) {
        var query={
            _id: new ObjectID(sanitize(idSalon))
        }
        console.log(query);
        var db = DB.getDB()
        db.collection(COLLECTION).findOne(query,function(err,doc){
            callback(err,doc)
        })
    }

    updateSalon(id_salon, req, callback){
      var db = DB.getDB()
      var query = {
        _id: new ObjectID(sanitize(id_salon))
      }
      db.collection(COLLECTION).update(query, req,function(err,doc){
          callback(err,doc)})
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
        db.collection(COLLECTION).insertOne(salon, function (err, docs) {
            if (err) return cb(err)
            callback("200", docs.ops[0]._id)
        });
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

    get_salon_courant(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find().toArray(function (err, results) {
       
            if (err) {
                return null;
            } else {
                var i = 0;
                var date_now = Date.now();
                var salon_suivant = results[0];
                var listesalonactuel = [];
                var ret = true;
                while ((results[i]) && ret) {
                    if ((date_now <= Date.parse(results[i].date_debut)) && (Date.parse(results[i].date_debut) <= Date.parse(salon_suivant.date_debut))) {
                        salon_suivant = results[i];
                    }
                    if ((Date.parse(results[i].date_debut)<= date_now) && date_now <= (Date.parse(results[i].date_fin)+86400000)) {
                        listesalonactuel.push(results[i]);
                    }
                    i++;
                }
                if (listesalonactuel.length == 0) {
                    listesalonactuel.push(salon_suivant);
                }
                callback(null, listesalonactuel);
            }
        });        
    }
    // get_salon_courant(callback) {
    //     var db = DB.getDB()
    //     db.collection(COLLECTION).find().toArray(function (err, results) {
       
    //         if (err) {
    //             return null;
    //         } else {
    //             var i = 0;
    //             var date_now = Date.now();
    //             var salon_courant_tmp = results[0];
    //             // var listesalonactuel;
    //             var ret = true;
    //             while ((results[i]) && ret) {
    //                 if ((date_now <= Date.parse(results[i].date_debut)) && (Date.parse(results[i].date_debut) <= Date.parse(salon_courant_tmp.date_debut))) {
    //                     salon_courant_tmp = results[i];
    //                 }
    //                 if ((Date.parse(results[i].date_debut)<= date_now) && date_now <= (Date.parse(results[i].date_fin)+86400000)) {
    //                     salon_courant_tmp = results[i];
    //                     ret = false;
    //                 }
    //                 i++;
    //             }
    //             callback(null, salon_courant_tmp);
    //         }
    //     });        
    // }

    /**
     * Retourne les salons ou un mail doit étre envoyé  
     */
    getSalonsSendMail(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find().toArray(function (err, results) {
            if (err) {
                return null;
            } else {
                var i = 0;
                var cpt;
                const CurrentDate = new Date().toISOString().slice(0,10); // Get current Date in YYYY-MM-DD
                while (results[i]) {
                    if (CurrentDate === results[i].date_mail) {
                        cpt = results[i];
                    }
                    i++;
                }
                callback(null, cpt);
            }
        });

    }
}
