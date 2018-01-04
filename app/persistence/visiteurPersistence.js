var DB = require('../../db')
var COLLECTION = 'visiteurs'
/**
 * Retourne un liste de visiteurs en fonction de l'id d'un salon
 * @param {*} id 
 * @param {*} callback 
 */
exports.get = function (id, callback) {
    var db = DB.getDB()
    db.collection('visiteurs').find({ id_salon: id }).toArray(function (err, results) {
        if (err) {
            callback("FAIL");
        } else {
            callback(null, results);
        }
    });

}

/**
 * Enregistre un visiteur
 * @param {*} visiteur 
 * @param {*} callback 
 */
exports.save = function (visiteur, callback) {
    db = DB.getDB()
    db.collection(COLLECTION).insert({
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
    }, function (err, docs) {
        if (err) return cb(err)
        callback(null, docs.ops[0]._id)
    })
}
