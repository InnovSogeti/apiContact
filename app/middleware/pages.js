const isAuthenticated = require('./auth/isAuthenticated');

module.exports = (__) => {
    const {router} = __;

    router.use(function(req, res, next) {
   
        const excluded = [
            '/pages/login',
            '/rest/authenticate',
            '/rest/users/add',
            '/rest/contact/add',
            '/rest/getSalonCourant',
            '/pages/index'
        ];

        const included = [
            '/pages/gestionsalon',
            '/pages/addsalon',
            '/pages/index',
            '/pages/updateuser',
            '/pages/updateSalon',
            '/pages/contact',
            'pages/sendmail'
        ];
            
        isAuthenticated({
            ...__,
            req,
            res,
            next,
            excluded,
            included
        })
            .then(() => {              
                next();
            })
            .catch(() => {
                res.redirect('/pages/index')
            });
    });            
    
}