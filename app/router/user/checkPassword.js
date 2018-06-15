module.exports = ({router, usersController}) => {
  router.post('/rest/user/checkPassword', function (req, res) {
    usersController.checkPassword(req, function(err, groupe){
      if (err) {
        res.send(err);
      }
      else {
        res.send(groupe);
      }
    });
  })
}