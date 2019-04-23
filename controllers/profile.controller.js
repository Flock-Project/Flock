const mongoose= require('mongoose');
const User= require('../models/user.model')


module.exports.profile = (req, res, next) => {
    res.render('/profile')
  }
  
  module.exports.doProfile = (req, res, next) => {
    if (!req.body.password) {
      delete req.body.password;
    }
  
    const user = req.user;
    Object.assign(user, req.body);
    user.save()
      .then(user => res.redirect('profile'))
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('/profile', {
            user: req.body,
            errors: error.errors
          })
        } else {
          next(error);
        }
      });
  }
  