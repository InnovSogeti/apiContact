// Chargement des modules
const express = require('express');
const router = express.Router();

//Chargement des persistences
const SalonPersistence = require('./persistence/salonPersistence');
const salonPersistence = new SalonPersistence();

// Chargement des controleurs
const SalonController = require('./controller/salonController');
const salonController = new SalonController();
salonController.setPersistence(salonPersistence);


// Routage
router.get('/salon/list/', function (req, res) {
    salonController.getSalons(function (err, listeSalons) {
        res.send(listeSalons);
    });
});

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

// ne fonctionne pas
router.delete('/salon/dell/:id_salon', function (req, res) {
    salonController.deleteSalon(req, res);
});

router.post('/addSalons/', function (req, res) {
    salonController.addSalon(req, res);
});

module.exports = router;

