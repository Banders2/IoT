var WebSocketServer = require('ws').Server,
  resources = require('./../resources/model');

  var pirModel = resources.pi.sensors.pir;
  var tempModel = resources.pi.sensors.temperature;
  var humiModel = resources.pi.sensors.humidity;
exports.listen = function(server) {
  var wss = new WebSocketServer({server: server}); //#A
  console.info('WebSocket server started...');
  wss.on('connection', (ws) => { //#B
    resources.observe(changes => {
      changes.forEach(change => {
        if(checkModel(pirModel,change)){
          ws.send(JSON.stringify("Pir value: " + change.value), function () {});
        }
        else if(checkModel(tempModel,change)){
          ws.send(JSON.stringify("Temp: " +  change.value), function () {});
        }
        else if(checkModel(humiModel,change)){
          ws.send(JSON.stringify("Humidity: " +  change.value), function () {});
        }
    });
  });
  });
};

function checkModel(model, change){
  if (change.type === 'update' && model === change.path.slice(0, -1).reduce((obj, i) => obj[i], resources)) {return true;}
  return false;
}
