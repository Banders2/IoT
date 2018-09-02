var Gpio = require('onoff').Gpio;
var DhtSensor = require('rpi-dht-sensor');
var dht = new DhtSensor.DHT22(12);

module.exports.ledOn = () => {
    var led = new Gpio(4, 'out');
    led.writeSync(1);
}

module.exports.ledOff = () => {
    var led = new Gpio(4, 'out');
    led.writeSync(0);
}

module.exports.ledToggle = () => {
    var led = new Gpio(4, 'out');
    var ledstate = (led.readSync() + 1) % 2;
    console.log('read from led: ' + led.readSync());
    console.log('Led is now: ' + ledstate);
    led.writeSync(ledstate);
}

module.exports.humidityRead = () => {
    var readout = dht.read();
    console.log('Humidity: ' + readout.humidity.toFixed(2));
    return readout.humidity.toFixed(2) + '%';
}

module.exports.temperatureRead = () => {
    var readout = dht.read();
    console.log('Temp: ' + readout.temperature.toFixed(2));
    return readout.temperature.toFixed(2) + 'C';
}

var pirval = 'No value';

module.exports.pirRead = () => {
    var pir = new Gpio(17, 'in', 'both');
    
    pir.watch((err, val) => {
        if(err) throw err;
        
        console.log('Pir: ' + val);
        pirval = val.toString() + ' current value';
    })

    return pirval;
}