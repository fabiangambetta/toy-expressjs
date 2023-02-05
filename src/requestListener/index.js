const requestListener = {
    routesToHandle: {},
    middlewares: {},
  
    listenner: (req, res) => {
      const { method, path } = req;
      const handler = requestListener.routesToHandle[method][path];
      if (typeof handler === 'function') handler();
    },
  
    use: (path, handler) => {
      requestListener.middlewares[path] = handler;
    },
  
    handle: (method, path, handler) => {
      if (typeof handler !== 'function') return;
      requestListener.routesToHandle[method] = {
        ...requestListener.routesToHandle[method],
        [path]: handler
      };
    }
  };
  



module.exports = requestListener;