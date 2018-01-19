const DB = require('../../db')
const COLLECTION = 'salons'

module.exports = class SalonPersistence {

    /**
     * Suppression d'un salon
     */
    delete(id, callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).remove({ _id: id }, (err, item) => {
            callback(err)
        })
    }
    /**
     * Renvoie la liste des salons 
     * @param {*} callback 
     */
    get(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find().toArray(callback)
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
