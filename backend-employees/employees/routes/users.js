var express = require('express');
var router = express.Router();
var db = require("../src/database/db-con");

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

router.get('/employee', (req, res, next) => {
  res.send("OK")
});

module.exports = router;
