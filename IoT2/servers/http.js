var express = require('express'),
actuatorsRoutes = require('./../routes/actuators'),
sensorRoutes = require('./../routes/sensors'),
resources = require('./../resources/model'),
converter = require('./../middleware/converter'),
cors = require('cors'),
bodyParser = require('body-parser');

var path = require('path');
  

var app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorRoutes);

app.get('/pi', function (req, res) {
  // res.send('This is the most awesome page efter created by '+ resources.pi.name + '<br> Description: ' + resources.pi.description)
  res.sendFile(path.join(__dirname+'/../public/index.html'));
});

app.get('/links', function (req, res) {
  // res.send('This is the most awesome page efter created by '+ resources.pi.name + '<br> Description: ' + resources.pi.description)
  res.sendFile(path.join(__dirname+'/../public/links.json'));
});

app.get('/web', function (req, res) {
  // res.send('This is the most awesome page efter created by '+ resources.pi.name + '<br> Description: ' + resources.pi.description)
  res.sendFile(path.join(__dirname+'/../public/websocketsClient.html'));
});

app.use(converter()); // this is after app.get to ensure it will not bypass any other middleware
module.exports = app;