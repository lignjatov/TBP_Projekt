var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/bomba', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'banana.html'));
});
router.get('/toplina', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'topline.html'));
});

router.get('/svjetlost', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'svjetlost.html'));
});

module.exports = router;
