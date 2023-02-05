const server = require('../server/index');
const requestListenner = require('../requestListener/index');

const application = () => {

    const get = (path, handler) => {
        requestListenner().handle('GET', path, handler);
    }

    const use = (middleware) => {
        requestListenner().use(path, hanlder);
    }

    const listen = (port, message) => {
        server.createServer(port, requestListenner.listenner(), message);
    }
}




module.exports = application;