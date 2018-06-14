module.exports = (__) => {
    const {req, excluded, included, next, jwt, app} = __;
    return new Promise((resolve, reject) => {
            try {  
                console.log(req.url);
                
                var salon = /\/rest\/salon*/;     
                var index = /\/pages\/index*/;     
                     
                if ((excluded.indexOf(req.url) > -1) || (req.url.match(salon))|| (req.url.match(index))) {                 
                    resolve();
                }
                else {

                    var allcookies = getcookie(req);
                    var token = req.headers['x-access-token'] || allcookies.token;

                    if (token) {                          
                        jwt.verify(token, app.get('superSecret'), function(err, decoded) {	  
                            if (err) {                        
                                reject();
                            } else {                        
                                req.decoded = decoded;
                                resolve();
                            } 
                        });
                    } 
                    else {   
                        console.log("cc");
                         
                        reject();
                    }       
                }
            }
            catch(e) {            
                console.error(e);
                throw e;
            }
                        
    });
}

function match(urls, urlToMatch) {
    for(const url of urls) {
        const urlRegExp = new RegExp(`${url}.*`);
        if(urlToMatch.match(urlRegExp)) {
            return true;
        }
    }
    return false;
}
function getcookie(request) {
    var cookies = {};
    if (request.headers.cookie) {
        request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/)
        cookies[ parts[1].trim() ] = (parts[2] || '').trim();
        });
        return cookies;    
    }    
};