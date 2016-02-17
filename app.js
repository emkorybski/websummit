// Load Modules
var express = require('express');
var bodyParser = require('body-parser');
var attendeeslist = require('./routes/attendeeslist');
var mongoose = require('mongoose');

var app = express();

//Connect to Mongo database
var dbName='attendees';

var connectionString='mongodb://admin:as1nha@ds059375.mongolab.com:59375/'+dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', attendeeslist);

module.exports = app;

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
console.log('Express server listening to port ' + server.address().port);
});
