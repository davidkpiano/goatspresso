
var _ = require('lodash');

var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.API_PORT || 5478; // set to 8080 in env
var cors = require('cors');

var distance = require('./api/distance');
var seeders = require('./api/seeders');
var dbLib = require('./api/dbLib');

app.use(cors());
app.use(bodyParser.json());

app.get('/seed-cafes', seeders.cafes);

app.get('/seed-menu', seeders.menus);

app.get('/menu', (req, res) => {

  mongo.connect(dbLib.url, (err, db) => {

    db.collection('menu').find({}).toArray((err, menu) => {
      res.status(err ? 400 : 200).json(menu);
      db.close();
    });

  });
});

app.get('/cafes', (req, res) => {

  var lat = req.query.lat;
  var lon = req.query.lon;

  mongo.connect(dbLib.url, (err, db) => {

    db.collection('cafes').find({}).toArray((err, cafes) => {

      var formatted = _.forEach(cafes, (c) => {
        c.distance = distance.miles(c.lat, c.lon, lat, lon);
      });

      res.status(err ? 400 : 200).json(formatted);

      db.close();
    });

  });
});

// Get all Orders
app.get('/cafe/:cafeId/order', (req, res) => {

  // find lat lon from cafe
  // need cafe id from frontend
  var cafeId = req.params.cafeId;

  mongo.connect(dbLib.url, (err, db) => {

    db.collection('cafes').findOne({_id : ObjectID(cafeId)}, (err, cafe) => {

      if (err) {
        res.status(404).json('cafe not found');
      }

      db.collection('orders').find({cafeId: cafeId}).toArray((err, orders) => {
        var formatted = _.forEach(orders, (o) => {

          o.distance = cafe ? distance.miles(o.lat, o.lon, cafe.lat, cafe.lon) : null;
        });

        res.status(err ? 400 : 200).json(orders);
        db.close();
      });
    });


  });
});

// making new order
app.post('/cafe/:cafeId/order', (req, res) => {

  // need cafe id from frontend
  var cafeId = req.params.cafeId;

  mongo.connect(dbLib.url, (err, db) => {

    db.collection('cafes').find({_id : ObjectID(cafeId)}, (err, cafe) => {

      if (err) {
        res.status(404).json('cafe not found');
      }

      var order = req.body;
      order.cafeId = cafeId;

      db.collection('orders').insert(order, (err, order) => {
        res.status(err ? 400 : 200).json(order.ops[0]);
        db.close();
      });

    });
  });

});

// update location on order
app.put('/order/:orderId', (req, res) => {

  // need cafe id from frontend
  var orderId = req.params.orderId;

  mongo.connect(dbLib.url, (err, db) => {

    db.collection('orders').update(
      {_id : ObjectID(orderId)}, 
      { $set: {lat: req.body.lat, lon: req.body.lon}}, 
      (err, order) => {

        res.status(err ? 400 : 200).json(!err);
        db.close();
      });
  });

});

app.listen( port, () => {
  console.log('api listening on port: ' + port);
});
