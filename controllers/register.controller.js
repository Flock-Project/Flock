const mongoose= require('mongoose');
const User= require('../models/user.model')
const passport= require('passport');


module.exports.register= (req, res, next) =>{
    res.render('register')
};


module.exports.doRegister= (req, res, next)=>{
    function renderWithErrors (errors){
        res.render('register', {
            user:req.body,
            errors:errors
        })
    }

    User.findOne({
        email:req.body.email, 
        username:req.body.username
    })
    .then(user=>{
        if (user){
            renderWithErrors({
                email:"Email already registered"
            })
        } else if (user){
            renderWithErrors({
                username:"Username already registered"
            })
        }else{
            user= new User(req.body);
            return user.save()
            .then(user=> res.redirect("/login"))
        }
    })
    .catch(errors=>{
        if(error instanceof mongoose.Error.ValidationError){
            renderWithErrors(error.errors)
        }else{
            next(error)
        }
    })
};
