const http = require("http");

class DecoratedResponse extends http.ServerResponse {
  send(data) {
    this.writeHead(200, { "Content-Type": "application/json" });
    this.end(JSON.stringify(data));
  }
}

module.exports = DecoratedResponse;
