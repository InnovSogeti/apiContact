

module.exports = class SalonPersistenceMock {

    /**
     * Suppression d'un salon
     */
    delete(id, callback) {
    }
    /**
     * Renvoie la liste des salons 
     * @param {*} callback 
     */
    get(callback) {
        var listeSalons = [
            {
                "nom": "DevFest",
                "ville": "Nantes",
                "date_debut": "2015-10-30",
                "date_fin": "2016-11-30",
                "description": "cdscds",
                "id_salon": "DevFest_2015-10-30_2016-11-30"
            },
            {
                "nom": "AnjouPerspectives",
                "ville": "Angers",
                "date_debut": "2017-11-9",
                "date_fin": "2018-11-9",
                "description": "super forum",
                "id_salon": "AnjouPerspectives_2017-11-9_2018-11-9"
            }
        ];
        var err = null;
        callback(err,listeSalons)

    }

    /**
     * Enregistre un salon
     */
    save(salon, callback) {
      
    }

    get_a_day(callback) {
       return 6;

    }


    get_today(callback) {
        return {
            "nom": "AnjouPerspectives",
            "ville": "Angers",
            "date_debut": "2017-11-9",
            "date_fin": "2018-11-9",
            "description": "super forum",
            "id_salon": "AnjouPerspectives_2017-11-9_2018-11-9"
        }
    }
}
