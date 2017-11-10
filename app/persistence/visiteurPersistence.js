module.exports = class VisteurPersistence {

    constructor(db) {
            this.db = db;
        }
        /**
         * Enregistrer le visiteur
         */

    save(visiteur, callback) {
        var fs = require('fs');
        var json = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
        var obj = json; //tous le fichier JSON dans un obj
        var site_map = Object.keys(obj);
        var collect = json[site_map[3]];
        var collection = this.db.get("visiteurs");

        // envoie à la bdd
        collection.insert({
                "prenom": visiteur.prenom,
                "nom": visiteur.nom,
                "email": visiteur.email,
                "telephone": visiteur.telephone,
                "linkedin": visiteur.linkedin,
                "viadeo": visiteur.viadeo,
                "jeuMario": visiteur.jeuMario,
                "jeuPepper": visiteur.jeuPepper,
                "profil": visiteur.profil,
                "metier": visiteur.metier,
                "contact": visiteur.contact,
                "jour": visiteur.date,
                "id_salon": visiteur.id_salon
            },
            function(err, doc) {
                if (err) {
                    throw error
                }
                console.log('=> Inscription de ' + visiteur.prenom + ' ' + visiteur.nom);
            });
        callback("ok");
    }
};