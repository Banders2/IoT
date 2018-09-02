var gpio = require('../gpio/gpio');


module.exports.index = (req, res) => {
    gpio.ledOn();
    res.render('index', { title: 'Actuators' });
}