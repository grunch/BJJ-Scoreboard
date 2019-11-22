var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BJJ Scoreboard' });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'BJJ Scoreboard' });
});

router.get('/otro', function(req, res, next) {
  res.render('otro', { title: 'BJJ Scoreboard' });
});

module.exports = router;
