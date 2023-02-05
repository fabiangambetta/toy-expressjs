const http = require('http');

const server = {
    createServer: (requestListener, port, message) => {
      http.createServer(requestListener).listen(port);
      console.log(message);
    }
  };

module.exports = server;
