module.exports = class SalonController {

    //Init couche persistence
    setPersistence(salonPersistence) {
        this.salonPersistence = salonPersistence;
    }

    //****************************/
    //****** CRUD SALONS *********/
    //****************************/

    //Ajout d'un salon
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

    //Retourne le salon correspondant à idSalon
    getSalon(idSalon,callback){
        this.salonPersistence.getSalon(idSalon,callback)
    }

    //Retourne tous les salons enregistrés
    getSalons(callback) {
        this.salonPersistence.getAllSalons(callback)
    }

    // Suppression d'un salon
    deleteSalon(idSalon, callback) {
        console.log("Ctrl : Suppression du salon : "+idSalon);
        this.salonPersistence.delete(idSalon,function(err){
            //Gestion des KO
            if (err) return callback(err);
            //Retour OK
            callback("200");
        });
    }


    //****************************/
    //********* AUTRES ***********/
    //****************************/


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
     * Retourne le salon qui se passe aujourd'hui
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
}
