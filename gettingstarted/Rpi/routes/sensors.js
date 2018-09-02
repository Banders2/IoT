var express = require('express');
var router = express.Router();

var controller = require('../controllers/sensorController');
router.get('/', controller.index);

module.exports = router;
