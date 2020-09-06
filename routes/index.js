var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  if (req.body.message) {
    return res.send(req.body.message)
  }
});

router.get('/err', function(req, res, next) {
  if (req.body.message) {
     return res.send(req.body.message)
  }
});

module.exports = router;
