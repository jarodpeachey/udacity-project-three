// Dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

// Empty data object
projectData = {
  entries: [

  ],
};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware, as well as cors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('src'));

// Initialize server
const port = 3000;

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

// Set up HTTP request routes
app.get('/data', sendData);
app.post('/data', postData);

// Set up functions for HTTP requests
function sendData (request, response) {
  response.send(projectData);
}

function postData (request, response) {
  const newObject = {
    ...request.body,
    id: projectData.entries[projectData.entries.length - 1].id + 1 || 1,
  };

  projectData.entries.push(newObject);
  response.send('POST recieved');
}
