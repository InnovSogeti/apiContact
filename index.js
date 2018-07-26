const express = require('express');
const router = express.Router();
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
const path = require('path');
var config = require('./app/config'); // get our config file

app.use(function  (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

 
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extened: true }));

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable

const DB = require('./db');
const COLLECTION = 'users'
var sanitize = require('mongo-sanitize');

DB.connect(DB.MODE_PRODUCTION, function(err, db) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  }
});

//Chargement des persistences
const SalonPersistence = require('./app/persistence/salonPersistence');
const salonPersistence = new SalonPersistence();
const ContactPersistence = require('./app/persistence/contactPersistence');
const contactPersistence = new ContactPersistence();
const UsersPersistence = require('./app/persistence/usersPersistence');
const usersPersistence = new UsersPersistence();

// Chargement des controleurs
const SalonService = require('./app/services/salonService');
const salonService = new SalonService();
salonService.setPersistence(salonPersistence);

const ContactService = require('./app/services/contactService');
const contactService = new ContactService();
contactService.setPersistence(contactPersistence);

const UsersService = require('./app/services/usersService');
const usersService = new UsersService();
usersService.setPersistence(usersPersistence);

const __ = {
  express,
  router,
  app,
  bodyParser,
  morgan,
  mongoose,
  config,
  jwt,
  DB,
  COLLECTION,
  sanitize,
  salonPersistence,
  contactPersistence,
  usersPersistence,
  salonService,
  contactService,
  usersService
};


require('./app/middleware')(__);
require('./app/rest')(__);
require('./app/controllers')(__);
require('./views/pages/service_mail.js');


app.use(router);

app.listen(8000);
console.log('Listen 8000');