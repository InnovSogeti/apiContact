const isAuthenticated = require('./auth/isAuthenticated');

module.exports = (__) => {
    const {router} = __;

    router.use(function(req, res, next) {
        var salon = /\/salon\/*/;
    
        const included = [
            // '/pages/gestionsalon',
            // '/pages/addsalon',
            // '/pages/index',
            // '/pages/updateuser',
            // '/pages/updateSalon',
            // '/pages/contact'
        ];
        const excluded = [
            '/pages/login',
            '/rest/authenticate',
            '/rest/users/add',
            '/rest/contact/add',
            '/rest/getSalonCourant',
            '/pages/index'
        ];
                
        if ((excluded.indexOf(req.url) > -1)|| req.url.match(salon)) return next();
        isAuthenticated({
            ...__,
            req,
            res,
            next,
            included,
            excluded
        })
            .then(() => {
                next();
            })
            .catch(() => {
                res.status(403).send({ 
                    success: false, 
                    message: 'No token provided.'
                });
            });
        
    });
}