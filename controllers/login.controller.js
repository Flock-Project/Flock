const mongoose= require('mongoose');
const User= require('../models/user.model')
const passport= require('passport');


module.exports.login = (req, res, next) => {
    res.render('login');
  }
  
  module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validation) => {
      if (error) {
        next(error);
      } else if (!user) {
        res.render('login', {
          user: req.body,
          errors: validation
        })
      } else {
        return req.login(user, (error) => {
          if (error) {
            next(error)
          } else {
            res.redirect('/users')
          }
        })
      }
    })(req, res, next);
  }