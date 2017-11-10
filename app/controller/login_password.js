module.exports = function(app) {

    /**
     * verifie le mdp entré par le visiteur
     * si il est bon renvoie la liste des salons vers la page salon
     */
    app.post('/login_password', function(req, res) {
        var mdp = req.body.password;
        if (mdp == "a") {
            var MongoClient = require('mongodb').MongoClient;

            var fs = require('fs');
            var json = JSON.parse(fs.readFileSync('./public/site_map.json', 'utf8'));
            var obj = json; //tous le fichier JSON dans un obj
            var site_map = Object.keys(obj);
            var bdd = json[site_map[2]];
            var collection = "salon";
            var url = "mongodb://localhost:27017/";
            url = url + bdd;

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                db.collection(collection).find({}).toArray(function(err, result) {
                    res.render('salon', { str: result });
                    db.close();
                });
            });
        } else {
            res.redirect('/login');
        }
    });
}