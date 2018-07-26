// Load modules

const express = require("express");
const app = express();

// Router configuration
const REST_API_ROOT = '/api/serviceMail'; 
const port = 3000;

// Init server listening
app.listen(port, function () {
    console.log("API service listening on port : " + port);
});

// Authorize external access
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "localhost");
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
};

app.use(allowCrossDomain);

/**
 * API routes
 */
app.get(REST_API_ROOT, function (req, res) {
    console.log("coucou je check les mails")
    getSalonCourant(callback)

    if (true) {
        res.status(200);
        res.json("result");
    } else {
        res.status(404);
        res.json("pas de mail à envoyer");
    }
});


