var express = require('express');
var router = express.Router();

router.get('/appliContact', function(req, res) {
    var db = req.db;
    var collection = db.get('visiteurs');
    collection.find({},{},function(e,docs){
        res.render('appliContact', {
            "appliContact" : docs
        });
    });
});