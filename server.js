// Setup empty Js Object to act as endpoint for all routes
let projectData = {};
const port = 5000;

// Require express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware */

const bodyParser = require('body-parser'); // body-parser Variable

// Here we ar configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

//Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Initialize the main project folder
app.use(express.static('website'));

/* Start Setup Server */

//spin up the server & Callback to debug
app.listen(port,() =>{
    console.log(`Server Is Running On Port: ${port}`)
});

// Or This Code

// const server = app.listen(port,listening);
// function listening(){
//     console.log(`Server Is Running On Port: ${port}`)
// }

/* End Setup Server */


// Get Data
app.get('/all' , function(req,res){
    res.send(projectData);
});

// Post Data
app.post('/addWeatherData' , addData);

function addData(req,res){
    console.log(req.body)

    projectData['date']    = req.body.date;
    projectData['temp']    = req.body.temp;
    projectData['content'] = req.body.content;

    res.send(projectData);
}