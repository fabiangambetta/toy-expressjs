const http = require('http');

let response = Object.create(http.ServerResponse.prototype);

response.send = (res,data) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', data.length);
    res.writeHead(200);
    res.end(data);
}


module.exports = response;