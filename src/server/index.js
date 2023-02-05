const http = require('http');

const server = () => {

    const createServer = (requestListenner, port, message) => {
        http.createServer(requestListenner).listen();
        console.log(message);
    }
}

module.exports = server;
