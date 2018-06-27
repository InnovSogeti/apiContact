module.exports = class SalonController {
    
     envoiemail(req, err) {
      this.salonPersistence.getAllSalons(req.body, (listeSalon, err)  => {
        for (salon of listeSalon){
          console.log("a");
          //Verifier si salon a une date et un template de mail
          if(salon.date_envoi !="" && salon.template_mail !=""){
                   // Verfier que la date de declenchement est bien inferieur à maintenant
            if (salon.date_envoi < new Date()){
                var listeContacts = this.contactPersistence.getContactsParSalon(req.body, (listeContacts, err));
                var result="";
                    for (var i in listeContacts) {
                        result = listeContacts[i];

                    }
                }
            }      
        }
    })
};
//aller voir dans update salon
        
    //Init couche persistence
    setPersistence(salonPersistence, contactPersistence) {
        this.salonPersistence = salonPersistence;
        this.contactPersistence = contactPersistence;
    }

    //****************************/
    //****** CRUD SALONS *********/
    //****************************/

    //Ajout d'un salon
    addSalon(req, callback) {
        console.log(req.body)
        this.salonPersistence.save(req.body, callback);
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


    updateSalon(id_salon, req, callback) {
        console.log(req.body)
        this.salonPersistence.updateSalon(id_salon, req.body, callback);
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
    get_salon_courant(callback) {
        this.salonPersistence.get_salon_courant(callback);
    }
    
}
