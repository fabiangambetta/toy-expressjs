import server from "../server/index";
import requestListenner from "../requestListener/index";
import * as http from "http";
import { Application, HttpMethod, SimpleHandler } from "../types";

const httpVerbs: Array<HttpMethod> = [
  "GET",
  "PUT",
  "HEAD",
  "DELETE",
  "OPTIONS",
  "POST",
  "PATCH",
];

const application: Application = {
  use: (path: string, middleware: http.RequestListener) => {
    requestListenner.use(path, middleware);
  },

  listen: (port: number) => {
    server.createServer(port, requestListenner.listenner);
  },
};

httpVerbs.forEach((httpVerb) => {
  application[httpVerb] = (path: string, handler: SimpleHandler) => {
    // path puede ser por ejemplo /users/:id/sales
    if (typeof handler === "function") {
      requestListenner.handle(httpVerb, path, handler);
    }
  };
});

export default application;
