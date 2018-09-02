var gpio = require('../gpio/gpio');


module.exports.index = (req, res) => {
    res.render('index', { title: 'Actuators' });
}