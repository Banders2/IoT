var gpio = require('../gpio/gpio');


module.exports.index = (req, res) => {
    res.render('index', { title: 'Actuators' });
}

module.exports.toggleLED = (req, res) => {
    gpio.ledToggle();
    res.redirect('/');
}