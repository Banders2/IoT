var gpio = require('../gpio/gpio');

module.exports.index = (req, res) => {
    var hum = gpio.humidityRead();
    var temp = gpio.temperatureRead();
    var pir = gpio.pirRead();

    res.render('sensors', { title: 'Sensors', humidity: hum, temperature: temp, pir: pir });
};