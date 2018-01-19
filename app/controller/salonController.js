// import { read } from 'fs';
// import { error } from 'util';

// Chargement de la couche persistence
const SalonPersistence = require('../persistence/salonPersistence');

module.exports = class SalonController {

    // constructor() {
    //     this.salonPersistence = new SalonPersistence();
    // }

    setPersistence(salonPersistence) {
        this.salonPersistence = salonPersistence;
    }
    /**
 * Renvoie la liste des salons
 * @param {*} res 
 */
    getSalons(callback) {
        this.salonPersistence.get(callback)
    }

    /**
     * Vérifie le mot de pass entré par l'utilisateur
     * @param {*} req 
     * @param {*} res 
     */
    checkPassword(req, res) {
        if (req.params.mdp == 'a') {
            res.send('200');
        } else {
            res.send('404');
        }
    }
    /**
     * Retourne le qui se passe aujourd'hui
     * @param {*} res 
     */
    getSalonCourant(callback) {
        this.salonPersistence.get_today(callback);
    }
    /**
     * Retourne le nombre de salons pour un jour donné
     * @param {*} res 
     */
    getNbSalons(res) {
        this.salonPersistence.get_a_day(function (err, day) {
            res.send(day);
        });
    }

    // ne fonctionne pas 
    deleteSalon(req, res) {
        console.log(req.body.id_salon)
        this.salonPersistence.delete(req.body.id_salon, function (err, listeSalons) {
            console.log(listeSalons);
            res.send(listeSalons);
        });
    }

    // /**
    //  * delete un salon
    //  */
    // app.delete('/salon/dell/:id_salon', (req, res) => {
    //     salonPersistence.delete(req, function(listeSalons) {
    //         res.send(listeSalons)
    //     });
    // });

    addSalon(req, callback) {
        console.log(req.body)
        var id = req.body.nom_salon + '_' + req.body.debut_salon + '_' + req.body.fin_salon;
        var salon = {
            nom: req.body.nom_salon,
            ville: req.body.ville_salon,
            description: req.body.description_salon,
            date_debut: req.body.debut_salon,
            date_fin: req.body.fin_salon,
            id_salon: id
        };
        this.salonPersistence.save(salon, callback);
    }
}




