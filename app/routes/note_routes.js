module.exports = function(app, db) {

    /**
     * récupere la liste des visiteurs d'un salon
     */
    var ObjectId = require('mongodb').ObjectID;
    app.get('/notes/:id_salon', (req, res) => {
        const id = req.params.id_salon;
        db.collection('visiteurs').find({ id_salon: id }).toArray(function(err, results) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    });

    /**
     * ajout d'un salon
     */
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('visiteurs').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.post('/api/adduser', (req, res) => {
        res.send("BRAVO");
        console.log(req.body.prenom)
            /*const note = { text: req.body.body, title: req.body.title };
            db.collection('visiteurs').insert(note, (err, result) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(result.ops[0]);
                }
            });*/
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
};