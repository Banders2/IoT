var WebSocketServer = require('ws').Server,
  resources = require('./../resources/model');

  var pirModel = resources.pi.sensors.pir;
  var tempModel = resources.pi.sensors.temperature;
  var humiModel = resources.pi.sensors.humidity;
exports.listen = function(server) {
  var wss = new WebSocketServer({server: server}); //#A
  console.info('WebSocket server started...');
  wss.on('connection', function (ws, req) { //#B
    var url = req.url;
    console.info(url);
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


// function selectResouce(url) { //#E
//   var parts = url.split('/');
//   parts.shift();
//   for (var i = 0; i < parts.length; i++) {
//     result = result[parts[i]];
//   }
//   return result;
// }


//#A Create a WebSockets server by passing it the Express server
//#B Triggered after a protocol upgrade when the client connected
//#C Register an observer corresponding to the resource in the protocol upgrade URL
//#D Use a try/catch to catch to intercept errors (e.g., malformed/unsupported URLs)
//#E This function takes a request URL and returns the corresponding resource

