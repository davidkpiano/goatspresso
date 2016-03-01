
var express = require( 'express' );
var livereload = require('express-livereload');
var app = express();

var dir = 'public';

var config = {watchDir: process.cwd() + '/' + dir};
livereload(app, config);

var port = process.env.PORT || 8080;

app.use(express.static( __dirname + '/' + dir+ '/' ) );

app.listen( port );

console.log("Serving at: http://localhost:" + port + "/");
