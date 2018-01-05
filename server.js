const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 8000;

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extened: true }));

app.get('/add_salon', function (req, res, next) {
    res.render('add_salon', { title: 'Express' });
});

app.use(require('./app/router'));

const DB = require('./db');
DB.connect(DB.MODE_PRODUCTION, function(err, db) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    //require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log("App listening on port " + port);
    })
  }
})


const VisiteurPersistence = require('./app/persistence/visiteurPersistence');
const SalonPersistence = require('./app/persistence/salonPersistence');

// require('./app/controller/visiteurController')(app, VisiteurPersistence);
// require('./app/controller/salonController')(app, SalonPersistence);
