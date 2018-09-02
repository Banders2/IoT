var Gpio = require('onoff').Gpio;

module.exports.ledOn = () => {
    var led = new Gpio(4, 'out');
    led.writeSync(1);
}

module.exports.ledOff = () => {
    var led = new Gpio(4, 'out');
    led.writeSync(0);
}

module.exports.humidityRead = () => {

}

module.exports.temperatureRead = () => {
    
}

module.exports.pirRead = () => {
    
}