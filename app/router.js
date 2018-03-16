// Chargement des modules
const express = require('express');
const router = express.Router();

//Chargement des persistences
const SalonPersistence = require('./persistence/salonPersistence');
const salonPersistence = new SalonPersistence();
const ContactPersistence = require('./persistence/contactPersistence');
const contactPersistence = new ContactPersistence();


// Chargement des controleurs
const SalonController = require('./controller/salonController');
const salonController = new SalonController();
salonController.setPersistence(salonPersistence);
const ContactController = require('./controller/contactController');
const contactController = new ContactController();
contactController.setPersistence(contactPersistence);



// Routage

//****************************/
//********* SALONS ***********/
//****************************/

//Ressource qui enregistre un nouveau salon
router.post('/salon/add', function (req, res) {
    salonController.addSalon(req, function(retour,idCree){
        console.log(retour)
        console.log(idCree)
        res.send(retour);
    });
});

// Retourne le salon correspondant à id_salon
router.get('/salon/:id_salon', function (req, res) {
    console.log(req.params.id_salon);
    salonController.getSalon(req.params.id_salon,function (err, salon) {
        if(err) {
            res.send(err);
        }else{
            res.send(salon);
        }
    });
});

// Ressource qui remonte tout les salons
router.get('/salon', function (req, res) {
    salonController.getSalons(function (err, listeSalons) {
        if(err) {
            res.send(err);
        }else{
            res.send(listeSalons);
        }
    });
});

// Ressource qui supprime un salon
router.delete('/salon/:id_salon', function (req, res) {
    salonController.deleteSalon(req.params.id_salon, function(retour){
        res.send(retour);
    });
});

//****************************/
//******** CONTACTS **********/
//****************************/
//Ressource qui enregistre un nouveau contact
router.post('/contact/add', function (req, res) {
    contactController.addContact(req, function(retour,idCree){
        console.log(retour)
        console.log(idCree)
        res.send(retour);
    });
});

//Ressource qui remonte tous les contacts pris lors d'un salon.
router.get('/contact/salon/:id_salon', function (req, res) {
    contactController.getContactsParSalon(req.params.id_salon, function(err,listeContacts){
        console.log("err="+err);
        console.log("listeContacts="+listeContacts);
        if(err) {
            res.send(err);
        }else{
            res.send(listeContacts);
        }
    });
});

//****************************/
//********* AUTRES ***********/
//****************************/


router.get('/password/:mdp', function (req, res) {
    salonController.checkPassword(req, res);
})

router.get('/salon/affSalon/', function (req, res) {
    salonController.getSalonCourant(function (err, today) {
        res.send(today);
    });
});


router.get('/salon/get/', function (req, res) {
    salonController.getNbSalons(res);
});



//Ressource qui enregistre un nouveau salon
router.post('/salon/add', function (req, res) {
    salonController.addSalon(req, function(retour,idCree){
        console.log("LOG BH 01 >")
        console.log(retour)
        console.log(idCree)
        console.log("< LOG BH 01")
        res.send(retour);
    });
});

module.exports = router;

