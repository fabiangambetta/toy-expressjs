const http = require("http");
const DecoratedResponse = require("../extended/decoratedResponse");

const server = {
  createServer: (requestListener, port, message) => {
    http
      .createServer({ ServerResponse: DecoratedResponse }, requestListener)
      .listen(port);
    console.log(message);
  },
};

module.exports = server;
