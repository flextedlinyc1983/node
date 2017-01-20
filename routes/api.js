var express = require('express');
// var User = require('../lib/user');
var apiRoutes = express.Router(); 
apiRoutes.use(function(req, res, next) {
  console.log('test')
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    // jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
    //   if (err) {
    //     return res.json({ success: false, message: 'Failed to authenticate token.' });    
    //   } else {
    //     // if everything is good, save to request for use in other routes
    //     req.decoded = decoded;    
    //     next();
    //   }
    // });

        
        next();

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

exports.auth = apiRoutes;