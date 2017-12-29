module.exports = class SalonPersistence {

    constructor(db) {
        this.db = db;
    }

    delete(req, callback) {
        const id = req.params.id_salon;
        const details = { 'id_salon': id };
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/appliContact";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection('salon').remove(details, (err, item) => {
                if (err) {
                    callback("NULL");
                } else {
                    callback(item);
                }
            });
        });
    }

    get_a_day(callback) {
        Date.prototype.yyyymmdd = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [this.getFullYear(),
                (mm > 9 ? '-' : '0') + mm,
                (dd > 9 ? '-' : '0') + dd
            ].join('');
        };

        var date = new Date();
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/appliContact";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection('salon').find({}).toArray(function(err, results) {
                if (err) {
                    return null;
                } else {
                    var i = 0;
                    var cpt = 0;
                    while (results[i]) {
                        if ((date.yyyymmdd() >= results[i].date_debut) && (date.yyyymmdd() <= results[i].date_fin)) {
                            cpt++;
                        }
                        i++;
                    }
                    cpt = cpt.toString();
                    callback(cpt);
                }
            });
        });
    }

    get_today(callback) {
        Date.prototype.yyyymmdd = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [this.getFullYear(),
                (mm > 9 ? '-' : '0') + mm,
                (dd > 9 ? '-' : '0') + dd
            ].join('');
        };

        var date = new Date();
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/appliContact";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection('salon').find({}).toArray(function(err, results) {
                if (err) {
                    return null;
                } else {
                    var i = 0;
                    var cpt;
                    while (results[i]) {
                        if ((date.yyyymmdd() >= results[i].date_debut) && (date.yyyymmdd() < results[i].date_fin)) {
                            cpt = results[i];
                        }
                        i++;
                    }
                    callback(cpt);
                }
            });
        });
    }

    get(callback) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/appliContact";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection('salon').find({}).toArray(function(err, results) {
                if (err) {
                    return null;
                } else {
                    callback(results);
                }
            });
        });
    }

    /**
     * Enregistre le salon
     */
    save(salon, callback) {
        var collect = "salon";
        var collection = this.db.get(collect);
        // envoie à la bdd
        collection.insert({
                "nom": salon.nom,
                "ville": salon.ville,
                "date_debut": salon.date_debut,
                "date_fin": salon.date_fin,
                "description": salon.description,
                "id_salon": salon.id_salon
            },
            function(err, doc) {
                if (err) {
                    throw error;
                    res.send('500');
                } else {
                    console.log('=> Ajout du salon : ' + salon.nom + ' à ' + salon.ville);
                }
            });
        callback("ok");
    }
}