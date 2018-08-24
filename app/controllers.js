module.exports = (__) => {
    const {router} = __;
    router.get('/pages/login', function(req, res) {       
        res.render('pages/login', {});
    });
    router.get('/pages/add_salon', function(req, res) {
        res.render('pages/addsalon', {});
    });
    router.get('/pages/gestionsalon', function(req, res) {
        res.render('pages/gestionsalon', {});
    });
    router.get('/pages/index', function(req, res) {
        res.render('pages/index', {});
    });
    router.get('/pages/updateSalon', function(req, res) {
        res.render('pages/updateSalon', {});
    });
    router.get('/pages/updateuser', function(req, res) {        
        res.render('pages/updateuser', {});
    });
    router.get('/pages/contact', function(req, res) {
        res.render('pages/contact', {});
    });
}

