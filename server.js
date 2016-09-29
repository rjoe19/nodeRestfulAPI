// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
//==============================================================================

var router = express.Router(); //create instance of express router

// testing route

router.get('/', function(req,res) {
  res.json({message: 'hooray! welcome to our api'});
});

//REGISTER THE ROUTES
// all routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// ==============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);
