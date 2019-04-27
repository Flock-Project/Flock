const mongoose= require('mongoose');
const User= require('../models/user.model')
const passport= require('passport');


module.exports.register= (req, res, next) =>{
    res.render('register')
};


module.exports.doRegister= (req, res, next)=>{
    function renderWithErrors(errors) {
        res.render('register', {
            user:req.body,
            errors:errors
        })
    }

    User.findOne({ email: req.body.email })
        .then(user=>{
        if (user){
            renderWithErrors({
                email:"Email already registered"
            })
        } else {
          console.log(req.body)
            user= new User(req.body);
            return user.save()
                .then(user => res.redirect("/login"))
        }
    })
    .catch(error=>{
        if(error instanceof mongoose.Error.ValidationError){
            renderWithErrors(error.errors)
        }else{
            next(error)
        }
    });
}
 

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
          res.redirect('/profile')
        }
      })
    }
  })(req, res, next);
}

module.exports.profile = (req, res, next) => {
  res.render('profile', { user: req.user })
}

module.exports.doProfile = (req, res, next) => {
if (!req.body.password) {
  delete req.body.password;
}

const user = req.user;
Object.assign(user, req.body);
user.save()
  .then(user => res.redirect('/profile'))
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render('profile', {
        user: req.body,
        errors: error.errors
      })
    } else {
      next(error);
    }
  });
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
}
