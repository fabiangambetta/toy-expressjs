const http = require('http');
const requestListener = () => {
    const routesToHandle = {};
    const middlewares = {};

    const listenner = (req, res) => {
        const {method, path } = req;
        const handler = routesToHandle[method][path];
        if (typeof handler === 'function')
            handler();
    };

    const use = (path, handler) => {
        middlewares[path] = handler;
    };

    const handle = (method, path, handler) => {
        if( typeof handler !== 'function' )
            return;
        routesToHandle[method] = {...routesToHandle[method], [path]: handler};
    }



}



module.exports = requestListener;