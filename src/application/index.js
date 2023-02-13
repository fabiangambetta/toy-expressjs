const server = require('../server/index');
const requestListenner = require('../requestListener/index');

const application =  {

    get: (path, handler) => {
        if(typeof handler === 'function')
            requestListenner.handle('GET', path, handler);
    },

    use: (middleware) => {
        requestListenner.use(path, middleware);
    },

    listen: (port, message) => {
        server.createServer(port, requestListenner.listenner(), message);
    }
}


module.exports = application;