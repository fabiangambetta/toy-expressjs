const application = (configs = {}) => {
    const middlewares = [];
    const routesToHandle = [];
    const addMiddleware = (middleware) => {
        middlewares.push(middleware);
    }

    const get = (path, routeHandler) => {
        routeHandler.push({route: path, handler: routeHandler});
    }
}




module.exports = application;