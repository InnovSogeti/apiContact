module.exports = class ContactController {

    //Init couche persistence
    setPersistence(contactPersistence) {
        this.contactPersistence = contactPersistence;
    }

    //****************************/
    //****** CRUD CONTACTS *******/
    //****************************/

    /**
     * met les informations du contact dans un objet "contact"
     * si l'utilisateur a choisi un profil son obj et son profil est envoyé vers la fonction check_profil psui vers get puis vers la page index
     * si le contact veut etre recontacté mais ne met pas de profil, redirection vers la fonction get puis vers la page index
     * si le contact ne veut pas etre recontacté redirection vers get puis vers la page index
     */
    addContact(req, callback) {
        console.log("id_salon "+  req.body.id_salon);        
        this.contactPersistence.save(req.body, callback);
    };

    // addContact(req, callback) {
    //     -        console.log("Enregistrement Contact :"+req);
    //     -        var contact = {
    //     -            prenom: req.body.prenom,
    //     -            email: req.body.email,
    //     -            nom: req.body.nom,
    //     -            telephone: req.body.telephone,
    //     -            linkedin: req.body.linkedin,
    //     -            viadeo: req.body.viadeo,
    //     -            // jeuMario: req.body.jeuMario,
    //     -            // jeuPepper: req.body.jeuPepper,
    //     -            profil: req.body.button,
    //     -            metier: req.body.metier,
    //     -            accepteReContacte: req.body.ok,
    //     -            id_salon: req.body.id_salon,
    //     -            autre: req.body.autre,
    //     -            datePriseContact: new Date()
    //     -        };
    //     -        console.log("Le contact :"+contact);
    //     -        this.contactPersistence.save(contact, callback);
    //     +        console.log(req.body);        
    //     +        this.contactPersistence.save(req.body, callback);
    //          };
         
    /**
     *Permet de lister tous les visiteurs pris lors d'un salon en particulier
     */
    getContactsParSalon(idSalon,res){
        console.log("Liste les contacts pour le salon id="+idSalon);
        this.contactPersistence.getContactsParSalon(idSalon,res);
    };

    updateContact(id_contact, req, callback) {
        console.log(req.body)
        this.contactPersistence.updateContact(id_contact, req.body, callback);
    }

    //Retourne tous les contacts enregistrés
    getContacts(callback) {
        this.contactPersistence.getAllContacts(callback)
    }

    /**
     *
     * @param {*} metier
     * @param {*} profil
     * Permet de verifier ce qui est conntenu dans "metier" et de garder que les metiers qui corresponde au profil
     * renvoie un tableau qui contient les metiers
     */

    fill_res(metier, my_profil, j, res, k) {
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

    count_k(metier, my_profil, j, res, k) {
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
    check_profil(metier, profil) {
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
    get(visiteur, callback) {
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

};
