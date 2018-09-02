var express = require('express');
var router = express.Router();

var controller = require('../controllers/homepageController');
router.get('/', controller.index);

module.exports = router;