const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const monk = require('monk');
const path = require('path');
const port = 8000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extened: true }));


app.get('/', function(req, res, next) {
    res.render('index', { my_id: "", cam: "NON" });
});

app.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

app.get('/login_password', function(req, res, next) {
    res.render('login_password', { title: 'Express' });
});

app.get('/salon', function(req, res, next) {
    res.render('salon', { str: cam });
});

app.get('/add_salon', function(req, res, next) {
    res.render('add_salon', { title: 'Express' });
});

app.get('/password', function(req, res, next) {
    res.render('password', { title: 'Express' });
});

app.get('/config', function(req, res, next) {
    res.render('config', { str: "NON" });
});

MongoClient.connect(db.url, (err, database) => {

    if (err) return console.log(err)
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log("App listening on port " + port);
    });

})

var mymonk = "localhost:27017/appliContact";
const bdd = monk(mymonk);

const VisiteurPersistence = require('./app/persistence/visiteurPersistence');
const visiteurPersistence = new VisiteurPersistence(bdd);

const SalonPersistence = require('./app/persistence/salonPersistence');
const salonPersistence = new SalonPersistence(bdd);

require('./app/controller/visiteurController')(app, visiteurPersistence);
require('./app/controller/salonController')(app, salonPersistence);
require('./app/controller/password')(app);
require('./app/controller/login_password')(app);