module.exports = function(app, db) {

    /**
     * récupere la liste des visiteurs d'un salon
     */
    var ObjectId = require('mongodb').ObjectID;
    app.get('/affSalon/:id_salon', (req, res) => {
        const id = req.params.id_salon;
        db.collection('visiteurs').find({ id_salon: req.params.id_salon }).toArray(function(err, results) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    });

    /**
     * affiche la liste des salons
     */
    app.get('/salon/:id', (req, res) => {
        db.collection('salon').find({}).toArray(function(err, results) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    });

    /**
     * ajout d'un ?
     */
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('visiteurs').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send("Bravo !");
            }
        });
    });

    /**
     * delete un salon
     */
    app.delete('/visiteurs/:id_salon', (req, res) => {
        const id = req.params.id_salon;
        const details = { 'id_salon': id };
        db.collection('salon').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.render('login', { str: "deleted" });
            }
        });
    });

    /**
     * verif du mdp
     */
    app.get('/password/:mdp', (req, res) => {
        if (req.params.mdp == 'a') {
            res.send('200');
        } else {
            res.send('404');
        }
    });

    /**
     * tirage au sort
     */
    app.get('/tirage/', (req, res) => {
        var date = new Date();
        var jour = date.getDate();
        console.log(jour)
        db.collection('visiteurs').find({ jour: jour }).toArray(function(err, results) {
            //db.collection('visiteurs').find({ jour: req.params.jour }).toArray(function(err, results) {
            //console.log(results);
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    });

    /**
     * return le nb de salon au jour donnée
     */
    app.get('/getSalon/', (req, res) => {
        Date.prototype.yyyymmdd = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [this.getFullYear(),
                (mm > 9 ? '-' : '0') + mm,
                (dd > 9 ? '-' : '0') + dd
            ].join('');
        };

        var date = new Date();
        db.collection('salon').find({}).toArray(function(err, results) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
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
                res.send(cpt);
            }
        });
    });

    /**
     * return le salon qui se passe ajd
     */
    app.get('/affSalon/', (req, res) => {
        Date.prototype.yyyymmdd = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [this.getFullYear(),
                (mm > 9 ? '-' : '0') + mm,
                (dd > 9 ? '-' : '0') + dd
            ].join('');
        };

        var date = new Date();
        db.collection('salon').find({}).toArray(function(err, results) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                var i = 0;
                var cpt;
                while (results[i]) {
                    if ((date.yyyymmdd() >= results[i].date_debut) && (date.yyyymmdd() < results[i].date_fin)) {
                        cpt = results[i];
                    }
                    i++;
                }
                res.send(cpt);
            }
        });
    });
}