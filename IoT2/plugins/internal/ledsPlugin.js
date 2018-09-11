var resources = require('./../../resources/model');

var actuator, interval;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;
var localParams = {'simulate': false, 'frequency': 2000};

exports.start = (params) => {
  localParams = params;
  observe(model);

  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (params.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function observe(what) {
  new Proxy(what, (changes) => {
    console.info('Change detected by plugin for %s...', pluginName);
    switchOnOff(model.value);
  });
};

function switchOnOff(value) {
  if (!localParams.simulate) {
    actuator.write(value === true ? 1 : 0, function () {
      console.info('Changed value of %s to %s', pluginName, value);
    });
  }
};

function connectHardware() {
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio, 'out');
  console.info('Hardware %s actuator started!', pluginName);
};

function simulate() {
  interval = setInterval(() => {
    if (model.value) {
      model.value = false;
    } else {
      model.value = true;
    }
  }, localParams.frequency);
  console.info('Simulated %s actuator started!', pluginName);
};