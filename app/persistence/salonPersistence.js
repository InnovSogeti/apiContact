module.exports = class SalonPersistence {

    constructor(db) {
            this.db = db;
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