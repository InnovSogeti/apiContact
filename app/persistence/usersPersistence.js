const DB = require('../../db')
const COLLECTION = 'users'
var sanitize = require('mongo-sanitize');
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('../config'); // get our config file
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable


module.exports = class UsersPersisence {


    checkPassword(req, callback) {
        // find the user
        var db = DB.getDB()

        var query = {
            login: sanitize(req.login),
        }

        db.collection(COLLECTION).findOne(query, function (err, user) {
            var res;
            if (err) throw err;

            if (!user) {
                res = { success: false, message: 'Authentication failed. User not found.' };
                callback(res, null);
            } else if (user) {

                // check if password matches
                if (user.pwd != req.pwd) {

                    res = { success: false, message: 'Authentication failed. Wrong password.' };
                    callback(res, null);
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
                    res = {
                        success: true,
                        groupe: groupe,
                        token: token
                    };
                    callback(null, res);
                }
            }
        });
    }




    checkLogin(users, callback) {
        var db = DB.getDB()
        var query = {
            login: sanitize(users.login)
        }
        db.collection(COLLECTION).findOne(query, function (err, infoUser) {
            console.log(infoUser == null);
            callback(infoUser == null, null);
        })
    }

    update(id_user, req, callback) {
        var db = DB.getDB()
        var query = {
            _id: new ObjectID(sanitize(id_user))
        }
        db.collection(COLLECTION).update(query, req, function (err, doc) {
            callback(err, doc)
        })
    }

    // Renvoie la liste des utilisateurs
    getAllUsers(callback) {
        var db = DB.getDB()
        db.collection(COLLECTION).find().toArray(function (err, doc) {
            callback(err, doc)
        })
    }


    //Find l'utilisateur qui correspondant à idUsers
    getUser(id_user, callback) {
        var query = {
            _id: new ObjectID(sanitize(id_user))
        }
        console.log(query);
        var db = DB.getDB()
        db.collection(COLLECTION).findOne(query, function (err, doc) {
            callback(err, doc)
        })
    }

    /**
     * Suppression d'un user
     */
    delete(idUsers, callback) {
        console.log("DB : Suppression d'un utilisateur' : " + idUsers);
        var db = DB.getDB()
        var query = {
            _id: new ObjectID(sanitize(idUsers))
        }
        db.collection(COLLECTION).remove(query, function (err, doc) {
            if (err) console.log("DB : log : " + err);
            callback(err)
        })
    }

    /**
     * Enregistre un user
     */
    save(users, callback) {
        var db = DB.getDB()

        db.collection(COLLECTION).insertOne(users, function (err, docs) {
            if (err) return callback(err)
            callback("200", docs.ops[0]._id)
        });
    }
}