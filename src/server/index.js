const http = require("http");
const DecoratedResponse = require("../extended/decoratedResponse");

const server = {
  createServer: (requestListener, port) => {
    http
      .createServer({ ServerResponse: DecoratedResponse }, requestListener)
      .listen(port);
    console.log(`App listening on port ${port}`);
  },
};

module.exports = server;
