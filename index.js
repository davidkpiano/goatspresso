var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.API_PORT || 5478; // set to 8080 in env
var cors = require('cors');
var mongo = require('mongodb').MongoClient;
var distance = require('./api/distance');

// Destination is Drunken Monkey
const destLat = 28.5492468;
const destLon = -81.3545004;

app.use(cors());
app.use(bodyParser.json());

var dbName = 'goatspresso';
var mongoUrl = (process.env.MONGOURL || 'mongodb://localhost:27017/') + dbName;

app.get('/seed-locations', (req, res) => {

  mongo.connect(mongoUrl, (err, db) => {

    var menu = require('./api/cafes');
    db.collection('cafes').remove({}, () => {
      db.collection('menu').insertMany(menu, (err, result) => {
        res.status(err ? 400 : 200).json(!err);
        db.close();
      });
    });

  });

});

app.get('/seed-menu', (req, res) => {

  mongo.connect(mongoUrl, (err, db) => {

    var menu = require('./api/menu');
    db.collection('menu').remove({}, () => {
      db.collection('menu').insertMany(menu, (err, result) => {
        res.status(err ? 400 : 200).json(!err);
        db.close();
      });
    });

  });

});

app.get('/menu', (req, res) => {

  mongo.connect(mongoUrl, (err, db) => {

    db.collection('menu').find({}).toArray((err, menu) => {
      res.status(err ? 400 : 200).json(menu);
      db.close();
    });

  });
});

// Get all Orders
app.get('/order', (req, res) => {

  mongo.connect(mongoUrl, (err, db) => {

    db.collection('orders').find({}).toArray((err, menu) => {
      res.status(err ? 400 : 200).json(menu);
      db.close();
    });

  });
});

// making new order
app.post('/order', (req, res) => {

  // find distance to Dest
  var distance = distance.miles(req.body.lat, req.body.lon, destLat, destLon);

  var order = req.body;


  mongo.connect(mongoUrl, (err, db) => {

    db.collection('orders').insert(req.body, (err, order) => {
      res.status(err ? 400 : 200).json(order);
      db.close();
    });

    res.status(connected ? 200 : 400).json(connected);

  });

});

app.listen( port, () => {
  console.log('api listening on port: ' + port);
});
