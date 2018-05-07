var express = require('express');
var express_geocoding_api = require('express-geocoding-api');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();


var Airport = require('./models/airport');
var State = require('./models/state');

app.use(express_geocoding_api({
    geocoder: {
        provider: 'google'
    }
}));

//mongoose connect
mongoose.connect('mongodb://localhost/airfind');

var db = mongoose.connection;

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

app.get('/api', function (req, res) {
    res.send('Welcome Prince');
});


app.get('/api/airports', function (req, res) {
    Airport.getAirports(function (err, docs) {
        if(err){
            res.send(err);
        }

        res.json(docs);
    });
});

app.post('/api/airports/prox', function (req, res) {
   var location = req.body;
    Airport.getAirportByProximity(location, function (err, docs) {
        if(err){
            res.send(err);
        }
        res.json(docs);
    })
});


app.get('/api/states', function (req, res) {
    State.getStates(function (err, docs) {
        if(err){
            res.send(err);
        }

        res.json(docs);
    });
});



app.get('/api/airports/state/:state', function (req, res) {
    Airport.getAirportByState(req.params.state, function (err, docs) {
        if(err){
            res.send(err);
        }

        res.json(docs);
    });
});


app.listen(3000);

console.log("App started on 3000");

