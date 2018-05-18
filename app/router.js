// Chargement des modules
const express = require('express');
const router = express.Router();
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config = require('./config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable

const DB = require('../db')
const COLLECTION = 'users'
var sanitize = require('mongo-sanitize');

//Chargement des persistences
const SalonPersistence = require('./persistence/salonPersistence');
const salonPersistence = new SalonPersistence();
const ContactPersistence = require('./persistence/contactPersistence');
const contactPersistence = new ContactPersistence();
const UsersPersistence = require('./persistence/usersPersistence');
const usersPersistence = new UsersPersistence();

// Chargement des controleurs
const SalonController = require('./controller/salonController');
const salonController = new SalonController();
salonController.setPersistence(salonPersistence);

const ContactController = require('./controller/contactController');
const contactController = new ContactController();
contactController.setPersistence(contactPersistence);

const UsersController = require('./controller/usersController');
const usersController = new UsersController();
usersController.setPersistence(usersPersistence);

// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Headers","*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//     next();
//   })
router.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
    next();
});
router.options('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    response.send();
});
// Routage
//****************************/
//********* Authenticate ***********/
//****************************/

router.post('/authenticate', function(req, res) {

    // find the user
    var db = DB.getDB()

    var query = {
        login: sanitize(req.body.login),
    }

	db.collection(COLLECTION).findOne(query, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.pwd != req.body.pwd) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
                
				// if user is found and password is right
				// create a token
				var payload = {
					admin: user.groupe	
				}
				var token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
                });
                var groupe = user.groupe;
				res.json({
					success: true,
					groupe: groupe,
					token: token
				});
			}		
		}
	});
});


router.use(function(req, res, next) {

    // const excluded = ['/contact/add'];
    const excluded = ['/authenticate'];

    if (excluded.indexOf(req.url) > -1) return next();
    // check header or url parameters or post parameters for token
    
    //var token = req.body.token;    
    var token = req.headers['x-access-token'];  
  
    	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {	        		
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			} 
		});
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});		
	}
});

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

// Permet d'update le salon
router.post('/salon/update/:id_salon', function (req, res) {
    salonController.updateSalon(req.params.id_salon, req, function(err, newsalon){
      if (res) {
        res.send(err)
      } else {
        res.send(newsalon);
      }
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
    try {
        contactController.addContact(req, function(retour,idCree){
            console.log(retour)
            console.log(idCree)
            res.send(retour);
        });
    } catch(e) {
        console.error(e);
    }
});

// Permet d'update un contact
router.post('/contact/update/:id_contact', function (req, res) {
    contactController.updateContact(req.params.id_contact, req, function(err, retour){
      if (res) {
        res.send(err)
      } else {
        res.send(retour);
      }
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

// Ressource qui remonte tout les contacts
router.get('/contact', function (req, res) {
    contactController.getContacts(function (err, listeContacts) {
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



//****************************/
//******** Users **********/
//****************************/

//Ressource qui enregistre un nouveau contact
router.post('/users/add', function (req, res) {
    usersController.addUsers(req, function(retour,idCree){
        console.log(retour)
        console.log(idCree)
        res.send(retour);
    });
});

router.post('/user/update/:id_users', function (req, res) {
    usersController.updateUsers(req.params.id_users, req, function(err, retour){
      if (res) {
        res.send(err)
      } else {
        res.send(retour);
      }
    });
});

// Ressource qui remonte tout les utilisateurs
router.get('/users', function (req, res) {
    usersController.getAllUsers(function (err, listeUser) {
        if(err) {
            res.send(err);
        }else{
            res.send(listeUser);
        }
    });
});

// Retourne le user correspondant à id_user
router.get('/user/:id_user', function (req, res) {
    console.log(req.params.id_user);
    usersController.getUsers(req.params.id_user,function (err, users) {
        if(err) {
            res.send(err);
        }else{
            res.send(users);
        }
    });
});

// Ressource qui supprime un user
router.delete('/users/:id_users', function (req, res) {
    usersController.deleteusers(req.params.id_users, function(retour){
        res.send(retour);
    });
});

router.post('/user/checkPassword', function (req, res) {
    usersController.checkPassword(req, function(err, groupe){
      if (err) {
        res.send(err);
      }
      else {
        res.send(groupe);
      }
    });
})

module.exports = router;
