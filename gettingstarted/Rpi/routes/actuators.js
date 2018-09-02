var express = require('express');
var router = express.Router();

var controller = require('../controllers/actuatorsController');
router.get('/', controller.index);
router.post('/toggleLED', controller.toggleLED);

module.exports = router;
