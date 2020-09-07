var express = require('express');
var router = express.Router();
var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;
//require('../database/conn');
const User = require('../models/user');

passport.use('local-signup', new PassportLocal({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},async (req,email,password,done)=> {
  const user = await User.findOne({'email': email})

  if(user) {
    return done(null, false, req.flash('message', 'The Email is already Taken.'));
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);

    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-signin', new PassportLocal({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req,email,password,done)=> {
  const user = await User.findOne({email:email});
  if(!user)
    return done(null, false, req.flash('message','No user found'))

  if(!user.comparePassword(password))
    return done(null, false, req.flash('message','Incorrect password'));
  
  return done(null, user, req.flash('message','Correct login'));
}));

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
  const user = await User.findById(id);
  done(null, user);
});

router.post('/login', passport.authenticate('local-signin',{
  successRedirect:"/home",
  failureRedirect:"/err",
  passReqToCallback:true
}));

router.post('/register', passport.authenticate('local-signup',{
  successRedirect:"/home",
  failureRedirect:"/err",
  passReqToCallback:true
}));

module.exports = router;
