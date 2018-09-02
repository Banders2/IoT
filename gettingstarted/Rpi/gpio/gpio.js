var Gpio = require('onoff').Gpio;
var DhtSensor = require('rpi-dht-sensor');
var dht = new DhtSensor.DHT22(2);

module.exports.ledOn = () => {
    var led = new Gpio(4, 'out');
    led.writeSync(1);
}

module.exports.ledOff = () => {
    var led = new Gpio(4, 'out');
    led.writeSync(0);
}

module.exports.humidityRead = () => {
    var readout = dht.read();
    return readout.humidity.toFixed(2) + '%';
}

module.exports.temperatureRead = () => {
    var readout = dht.read();
    return readout.temperature.toFixed(2) + 'C';
}

module.exports.pirRead = () => {
    var pir = new Gpio(17, 'in', 'both');
    pir.watch((err, val) => {
        if(err) throw err;
        return val;
    })
}