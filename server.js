// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Bear     = require('./app/models/bear');
var mongoose = require('mongoose');

// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
//==============================================================================

var router = express.Router(); //create instance of express router

//middleware to use for all requests
router.use(function(req, res, next) {
  //do logging
  console.log('something is happening');
  next(); // ensures we continue with next routes and don't stop ere
})


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


router.get('/', function(req,res) {
  res.json({message: 'hooray! welcome to our api'});
});

// we will add more routes for our API here...

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
    });

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });



//REGISTER THE ROUTES
// all routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// ==============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);
