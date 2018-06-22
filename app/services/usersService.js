module.exports = class UsersController {

    //Init couche persistence
    setPersistence(usersPersistence) {
        this.usersPersistence = usersPersistence;
    }

    //****************************/
    //****** CRUD Users *********/
    //****************************/

    //Ajout d'un user
    addUsers(req, callback) {
        this.usersPersistence.save(req.body, callback);   
    }


    addUsers(req, callback) {
        this.usersPersistence.checkLogin(req.body,(loginDispo, err) => {
        if(loginDispo){
            console.log("000000000000000");
            this.usersPersistence.save(req.body, callback);
        }
        else{
            callback("login deja existant",null);
        }
        })
    }



    updateUsers(id_user, req, callback) {
        console.log(req.body)
        this.usersPersistence.update(id_user, req.body, callback);
    }

    //Retourne le user correspondant à iduser
    getUser(id_user,callback){
        this.usersPersistence.getUser(id_user, callback)
    }

    //Retourne tous les users enregistrés
    getAllUsers(callback) {
        this.usersPersistence.getAllUsers(callback)
    }

    // Suppression d'un user
    deleteusers(idUsers, callback) {
        console.log("Ctrl : Suppression de l'utilisateur : "+idUsers);
        this.usersPersistence.delete(idUsers,function(err){
            //Gestion des KO
            if (err) return callback(err);
            //Retour OK
            callback("200");
        });
    }

    checkPassword(req, callback){
        console.log("Ctrl : vérification du mdp de l'utilisateur : "+ req.body.login);
        this.usersPersistence.checkPassword(req.body, function(err,infoUser){
            if (err) {
                callback(err);        
            } else {
                callback(infoUser);
            }
      });
    }

}
