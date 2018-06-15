module.exports = (__) => {
    const {app, router, usersService, salonService, contactService} = __;
    
    router.use(function(request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "*");
        next();
    });

    router.options('/*', function (request, response, next) {
        response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        response.send();
    });
    const multer = require('multer');
    var path = require('path');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/upload/')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
        }
    })
    
    
    var upload = multer({ storage: storage })
    
    // Routage
    //****************************/
    //********* Authenticate ***********/
    //****************************/

    router.post('/rest/authenticate', function(req, res) {
        usersService.checkPassword(req, function(err ,token){
            if (err) {
                console.log(err)
                res.send(err) 
            } 
            else{
                console.log(info)
                res.send(token);
            }      
            
        });
    });

    //****************************/
    //********* SALONS ***********/
    //****************************/

    //Ressource qui enregistre un nouveau salon
    router.post('/rest/salon/add', function (req, res) {
        salonService.addSalon(req, function(retour,idCree){
            console.log(retour)
            console.log(idCree)
            res.send(retour);
        });
    });

    // Retourne le salon correspondant à id_salon
    router.get('/rest/salon/:id_salon', function (req, res) {
        console.log(req.params.id_salon);
        salonService.getSalon(req.params.id_salon,function (err, salon) {
            if(err) {
                res.send(err);
            }else{
                res.send(salon);
            }
        });
    });

    // Ressource qui remonte tout les salons
    router.get('/rest/salon', function (req, res) {
        salonService.getSalons(function (err, listeSalons) {
            if(err) {
                res.send(err);
            }else{
                res.send(listeSalons);
            }
        });
    });

    // Ressource qui supprime un salon
    router.delete('/rest/salon/:id_salon', function (req, res) {
        salonService.deleteSalon(req.params.id_salon, function(retour){
            res.send(retour);
        });
    });

    //****************************/
    //******** CONTACTS **********/
    //****************************/
    //Ressource qui enregistre un nouveau contact
    router.post('/rest/contact/add', function (req, res) {
        try {
            contactService.addContact(req, function(retour,idCree){
                console.log(retour)
                console.log(idCree)
                res.send(retour);
            });
        } catch(e) {
            console.error(e);
        }
    });

    // Permet d'update un contact
    router.post('/rest/contact/update/:id_contact', function (req, res) {
        contactService.updateContact(req.params.id_contact, req, function(err, retour){
        if (res) {
            res.send(err)
        } else {
            res.send(retour);
        }
        });
    });


    //Ressource qui remonte tous les contacts pris lors d'un salon.
    router.get('/rest/contact/salon/:id_salon', function (req, res) {
        contactService.getContactsParSalon(req.params.id_salon, function(err,listeContacts){
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
    router.get('/rest/contact', function (req, res) {
        contactService.getContacts(function (err, listeContacts) {
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

    //permet l'upload du fichier
    router.post('/rest/fileupload', upload.single('logo'), (req, res) => {  
        console.log(req.file);
        res.send(req.file.path);
       
    
});

    router.get('/rest/getSalonCourant', function (req, res) {
        salonService.get_salon_courant(function (err, saloncourant) {
            if(err) {
                res.send(err);
            }else{
                res.send(saloncourant);
            }
        });
    });

    router.get('/rest/salon/affSalon/', function (req, res) {
        salonService.getSalonCourant(function (err, today) {
            res.send(today);
        });
    });


    router.get('/rest/salon/get/', function (req, res) {
        salonService.getNbSalons(res);
    });



    //Ressource qui enregistre un nouveau salon
    router.post('/rest/salon/add', function (req, res) {
        salonService.addSalon(req, function(retour,idCree){
            console.log("LOG BH 01 >")
            console.log(retour)
            console.log(idCree)
            console.log("< LOG BH 01")
            res.send(retour);
        });
    });

    router.post('/rest/salon/update/:id_salon', function (req, res) {
        salonService.updateSalon(req.params.id_salon, req, function(err, retour){
        if (res) {
            res.send(err)
        } else {
            res.send(retour);
        }
        });
    });
    //****************************/
    //******** Users **********/
    //****************************/

    //Ressource qui enregistre un nouveau contact
    router.post('/rest/users/add', function (req, res) {
        usersService.addUsers(req, function(err,retour){
                console.log(retour)
                console.log(err)
                res.send(retour);
        });
    });
    //     usersService.addUsers(req, function(retour,idCree){
    //         if (retour) {
    //             res.send(retour);
    //         }
    //         console.log(retour)
    //         // console.log(idCree)
    //         res.send(retour);
    //     });
    // });

    router.post('/rest/user/update/:id_users', function (req, res) {
        usersService.updateUsers(req.params.id_users, req, function(err, retour){
        if (err) {
            err.send(err)
        } else {
            res.send(retour);
        }
        });
    });

    // Ressource qui remonte tout les utilisateurs
    router.get('/rest/users', function (req, res) {
        usersService.getAllUsers(function (err, listeUser) {
            if(err) {
                res.send(err);
            }else{
                res.send(listeUser);
            }
        });
    });

    // Retourne le user correspondant à id_user
    router.get('/rest/user/:id_user', function (req, res) {
        console.log(req.params.id_user);
        usersService.getUser(req.params.id_user,function (err, users) {
            if(err) {
                res.send(err);
            }else{
                res.send(users);
            }
        });
    });

    // Ressource qui supprime un user
    router.delete('/rest/users/:id_users', function (req, res) {
        usersService.deleteusers(req.params.id_users, function(retour){
            res.send(retour);
        });
    });

    router.post('/rest/user/checkPassword', function (req, res) {
        usersService.checkPassword(req, function(err, groupe){
        if (err) {
            res.send(err);
        }
        else {
            res.send(groupe);
        }
        });
    })
}