var express = require('express');
var router = express.Router();
var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;

passport.use(new PassportLocal(function(username,password,done){
  if (username == "Santiago" && password == "123") {
    return done(null,{id:"1", name:"Santiago"});
  }
  done(null, false);
}));

passport.serializeUser(function(user, done){
  done(null,user.id);
});

passport.deserializeUser(function(id, done){
  done(null, {id:"1", name:"Santiago"});
});

router.post('/login', passport.authenticate('local',{
  successRedirect:"/home",
  failureRedirect:"/err"
}));

module.exports = router;
