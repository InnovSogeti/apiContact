module.exports = __ => {
    
    require('./middleware/pages')(__);
    require('./middleware/rest')(__);
}