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
        console.log(req.body)
        var id = req.body.nom + '_' + req.body.prenom + '_' + req.body.groupe;
        var users = {
            login : req.body.login,
            pwd : req.body.pwd,
            groupe : req.body.groupe,
            mail : req.body.mail,
            nom : req.body.nom,
            prenom : req.body.prenom,
            telPro : req.body.telPro,
            id_users : id
        };
        this.usersPersistence.save(users, callback);
    }
    updateUsers(id_user, req, callback) {
        console.log(req.body)
        var id = req.body.nom + '_' + req.body.prenom + '_' + req.body.groupe;
        var newdoc = {
            login : req.body.login,
            pwd : req.body.pwd,
            groupe : req.body.groupe,
            mail : req.body.mail,
            nom : req.body.nom,
            prenom : req.body.prenom,
            telPro : req.body.telPro,
            id_users : id
        };
        this.usersPersistence.update(id_user, newdoc, callback);
    }

    //Retourne le user correspondant à iduser
    getUsers(idUsers,callback){
        this.usersPersistence.getUsers(idUsers,callback)
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
      this.usersPersistence.checkPassword(req, callback);


    }

}