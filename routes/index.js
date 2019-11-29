var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BJJ Scoreboard' });
});

router.get('/control', function(req, res, next) {
  res.render('control', { title: 'BJJ Scoreboard control' });
});

module.exports = router;
