module.exports = function(app, visiteurPersistence) {
    function callback(data) {
        return (data);
    }

    /**
     *
     * @param {*} metier
     * @param {*} profil
     * Permet de verifier ce qui est conntenu dans "metier" et de garder que les metiers qui corresponde au profil
     * renvoie un tableau qui contient les metiers
     */

    function fill_res(metier, my_profil, j, res, k) {
        var z = 0;
        while (metier[z]) {
            if (metier[z] == my_profil[j]) {
                res[k] = my_profil[j];
                k++;
            }
            z++;
        }
        return (res);
    }

    function count_k(metier, my_profil, j, res, k) {
        var z = 0;
        while (metier[z]) {
            if (metier[z] == my_profil[j]) {
                k++;
            }
            z++;
        }
        return (k);
    }

    /**
     * 
     * @param {*} metier => tab qui contient TOUS les métier sélectionnés
     * @param {*} profil => profil choisi
     */
    function check_profil(metier, profil) {
        var fs = require('fs');
        var json = JSON.parse(fs.readFileSync('./public/config.json', 'utf8'));
        var obj = json;
        var file = Object.keys(obj);
        var j = 1;
        var k = 0;
        var i = 0;
        var my_profil;
        var res = [];
        my_profil = json[file[i]].split(',');
        while (my_profil[0] != profil) {
            if (i > 0)
                my_profil = json[file[i]].split(',');
            i++;
        }
        if (i > 0)
            i--;
        while (my_profil[j]) {
            my_profil[j] = my_profil[j].replace(/ /g, "_");
            if ((metier !== undefined) && (metier[0].length > 1)) {
                res = fill_res(metier, my_profil, j, res, k);
                k = count_k(metier, my_profil, j, res, k);
            } else {
                if (metier == my_profil[j]) {
                    res[0] = my_profil[j];
                }
            }
            j++;
        }
        return (res);
    }

    /**
     *
     * @param {*} visiteur
     * @param {*} callback
     * Permet de vérifier si le visiteur est déjà inscrit ou non si c'est le cas pas de persistance
     */
    function get(visiteur, callback) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/appliContact";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var query = { nom: visiteur.nom };
            db.collection("visiteurs").find(query).toArray(function(err, result) {
                if (err) throw err;
                var res = result.length;
                if (res == '0') {
                    db.close();
                    visiteurPersistence.save(visiteur, callback);
                } else {
                    db.close();
                    callback("ok");
                }
            });
        });
    }


    /**
     * met les informations du visiteur dans un objet "visiteur"
     * si l'utilisateur a choisi un profil son obj et son profil est envoyé vers la fonction check_profil psui vers get puis vers la page index
     * si le visiteur veut etre recontacté mais ne met pas de profil, redirection vers la fonction get puis vers la page index
     * si le visiteur ne veut pas etre recontacté redirection vers get puis vers la page index
     */
    app.post('/saveUsers', function(req, res) {
        var maintenant = new Date();
        var jour = maintenant.getDate();
        var visiteur = {
            prenom: req.body.prenom,
            email: req.body.email,
            nom: req.body.nom,
            telephone: req.body.telephone,
            linkedin: req.body.linkedin,
            viadeo: req.body.viadeo,
            competenceInfra: req.body.competenceInfra,
            competenceSecu: req.body.competenceSecu,
            competenceDigital: req.body.competenceDigital,
            competenceTest: req.body.competenceTest,
            jeuMario: req.body.jeuMario,
            jeuPepper: req.body.jeuPepper,
            profil: req.body.button,
            metier: req.body.metier,
            contact: req.body.ok,
            id_salon: req.body.my_id,
            date: jour
        };
        if (req.body.ok != "ok")
            visiteur.metier = "NULL";
        if (req.body.ok == "ok") {
            if (visiteur.profil !== undefined) {
                visiteur.metier = check_profil(req.body.metier, visiteur.profil);
                console.log(visiteur);
            }
            visiteur.contact = "oui";
            get(visiteur, callback);
            res.send('200');
        } else {
            visiteur.contact = "non";
            get(visiteur, callback);
            res.send('200');
        }
    });
};