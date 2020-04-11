const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');
//const serverUrl = 'http://127.0.0.1:3000';


// Path for the background image ///////////////////////
// module.exports.backgroundImageFile = path.join('.', 'background.jpg');
module.exports.backgroundImageFile = path.join('.', 'spec', 'water-lg.jpg');
////////////////////////////////////////////////////////

let presetMessageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};



module.exports.router = (req, res, next = () => { }) => {
  const produceImage = function (err, data) {
    //console.log('Reached callback');
    //console.log(data);
    if (err) {
      res.writeHead(404, headers);
      res.end();
    } else {
      res.writeHead(200, headers);
      // res.end();
      res.end(data, 'binary')
    }
  };

  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  console.log(req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end('');
  }

  if (req.method === 'GET') { //GET
    // if // the designated URL is just the server URL, send a swim command message (like below)
    if (req.url === '/') { //http://localhost:8080/
      //     '/' || '/background.jpg'
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
    } else if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, produceImage);
    }
  }

  if (req.method === 'POST') {
    res.writeHead(201, headers);
    res.end();
  }
  next();
}