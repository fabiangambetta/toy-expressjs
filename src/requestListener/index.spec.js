const requestListener = require('./index');

describe('requestListener', () => {
    test('handle method adds a new route', () => {
      requestListener.handle('GET', '/test', () => {});
      expect(requestListener.routesToHandle.GET['/test']).toBeTruthy();
    });
  
    test('use method adds a new middleware', () => {
      requestListener.use('/test', () => {});
      expect(requestListener.middlewares['/test']).toBeTruthy();
    });
  
    test('listenner method calls the correct route handler', () => {
      const mockHandler = jest.fn();
      requestListener.handle('GET', '/test', mockHandler);
      requestListener.listenner({ method: 'GET', path: '/test' }, {});
      expect(mockHandler).toHaveBeenCalled();
    });
  });
  