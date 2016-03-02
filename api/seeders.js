
var mongo = require('mongodb').MongoClient;
var dbLib = require('./dbLib');

module.exports = {

  menus : (req, res) => {

    mongo.connect(dbLib.url, (err, db) => {

      var menu = require('./menu');
      db.collection('menu').remove({}, () => {
        db.collection('menu').insertMany(menu, (err, result) => {
          res.status(err ? 400 : 200).json(!err);
          db.close();
        });
      });
    });
  },

  cafes : (req, res) => {

    mongo.connect(dbLib.url, (err, db) => {

      var cafes = require('./cafes');
      db.collection('cafes').remove({}, () => {
        db.collection('cafes').insertMany(cafes, (err, result) => {
          res.status(err ? 400 : 200).json(!err);
          db.close();
        });
      });

    });

  }
}