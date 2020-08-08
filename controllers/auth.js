const User = require('../models/user');
const session = require('express-session');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: req.session.isLoggedIn
    });
  // }
};

exports.postLogin = (req, res, next) => {
  User.findById('5f2e8bddb8bff94df6fab0d4')
    .then(user => {
      if(user){
        req.session.user = user
        req.session.isLoggedIn = true
        req.session.save(err => {
          if(err){
            console.log('session err', err);
          }
          res.redirect('/')
        })
      }else{
        res.redirect('/login')
      }
    })
  .catch(err => console.log('err ',err)) 
};
exports.posLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
