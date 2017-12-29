module.exports = function(app, db) {
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
        db.collection('visiteurs').find({ jour: jour }).toArray(function(err, results) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    });
}