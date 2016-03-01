var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.API_PORT || 5478;
var cors = require('cors');
var mongo = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.json());

var dbName = 'goatspresso';
var mongoUrl = (process.env.MONGOURL || 'mongodb://localhost:27017/') + dbName;

app.get('/seed-menu', (req, res) => {

  mongo.connect(mongoUrl, (err, db) => {

    var menu = require('./menu');
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

app.get('/', (req, res) => {

  // Use connect method to connect to the Server 
  mongo.connect(mongoUrl, (err, db) => {

    var connected = false;

    if (err === null) {
      connected = true;
    }

    res.status(connected ? 200 : 400).json(connected);

    // var collection = db.collection('distances');

    // collection.find({}).toArray((err, docs) => {
    //   res.status(connected ? 200 : 400).json(docs);
    //   db.close();
    // });

  });

});

app.listen( port, () => {
  console.log('api listening on port: ' + port);
});
