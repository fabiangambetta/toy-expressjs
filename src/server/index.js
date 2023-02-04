const http = require('http');
const requestListener = require('./requestListener');

http.createServer(requestListener).listen();