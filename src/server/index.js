const http = require('http');
const MyResponse = require('../extended/decoratedResponse')

const server = {
    createServer: (requestListener, port, message) => {
      http.createServer({ServerResponse: MyResponse},requestListener).listen(port);
      console.log(message);
    }
  };

module.exports = server;
