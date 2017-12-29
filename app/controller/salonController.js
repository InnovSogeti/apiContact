module.exports = function(app, salonPersistence) {
    function callback(data) {
        return (data);
    }


    /**
     * affiche la liste des salons
     */
    app.get('/salon/list/:id', (req, res) => {
        salonPersistence.get(function(listeSalons) {
            res.send(listeSalons)
        });
    });

    /**
     * return le salon qui se passe ajd
     */
    app.get('/salon/affSalon/', (req, res) => {
        salonPersistence.get_today(function(today) {
            res.send(today)
        });
    });

    /**
     * return le nb de salon au jour donnée
     * Ne fait pas la même chose que la fonction du dessus
     */
    app.get('/salon/get/', (req, res) => {
        salonPersistence.get_a_day(function(day) {
            res.send(day)
        });
    });

    /**
     * delete un salon
     */
    app.delete('/salon/dell/:id_salon', (req, res) => {
        salonPersistence.delete(req, function(listeSalons) {
            res.send(listeSalons)
        });
    });

    /**
     * Ajoute un salon
     * de la page  salon pour la page login
     */
    app.post('/addSalons/', function(req, res) {
        var id = req.body.nom_salon + '_' + req.body.debut_salon + '_' + req.body.fin_salon;
        var salon = {
            nom: req.body.nom_salon,
            ville: req.body.ville_salon,
            description: req.body.description_salon,
            date_debut: req.body.debut_salon,
            date_fin: req.body.fin_salon,
            id_salon: id
        };
        salonPersistence.save(salon, callback);
        res.send('200');
    });
};