import * as http from "http";
import DecoratedRequest from "../extended/decoratedRequest";
import DecoratedResponse from "../extended/decoratedResponse";

const serverOptions: http.ServerOptions = { IncomingMessage: DecoratedRequest, ServerResponse: DecoratedResponse };

const server = {
  createServer: (port: number, requestListener: http.RequestListener) => {
    http
      .createServer(serverOptions, requestListener)
      .listen(port);
    console.log(`App listening on port ${port}`);
  },
};

export default server;