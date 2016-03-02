
var _ = require('lodash');

var mongo = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.API_PORT || 5478; // set to 8080 in env
var cors = require('cors');

var distance = require('./api/distance');
var seeders = require('./api/seeders');
var db = require('./api/dbLib');

app.use(cors());
app.use(bodyParser.json());

app.get('/seed-cafes', seeders.cafes);

app.get('/seed-menu', seeders.menus);

app.get('/menu', (req, res) => {

  mongo.connect(db.url, (err, db) => {

    db.collection('menu').find({}).toArray((err, menu) => {
      res.status(err ? 400 : 200).json(menu);
      db.close();
    });

  });
});

app.get('/cafes', (req, res) => {

  var lat = req.query.lat;
  var long = req.query.long;

  mongo.connect(db.url, (err, db) => {

    db.collection('cafes').find({}).toArray((err, cafes) => {

      var formatted = _.forEach(cafes, (c) => {
        c.distance = distance.miles(c.lat, c.long, lat, long);
      });

      res.status(err ? 400 : 200).json(formatted);

      db.close();
    });

  });
});

// Get all Orders
app.get('/order', (req, res) => {

  mongo.connect(db.url, (err, db) => {

    db.collection('orders').find({}).toArray((err, menu) => {
      res.status(err ? 400 : 200).json(menu);
      db.close();
    });

  });
});

// making new order
app.post('/order', (req, res) => {

  // find distance to Dest
  var distance = distance.miles(req.body.lat, req.body.long, destLat, destLong);

  var order = req.body;

  mongo.connect(db.url, (err, db) => {

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
