var gpio = require('../gpio/gpio');


module.exports.index = (req, res) => {
    gpio.ledOff();
    res.render('page2', { title: 'Sensors' });
};