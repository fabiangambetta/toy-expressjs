import server from "../server/index";
import requestListenner from "../requestListener/index";
import { RequestListener } from "http";
import { Application, HttpMethod, RequestHandler } from "../types";

const httpVerbs: HttpMethod[] = [
  "GET",
  "PUT",
  "HEAD",
  "DELETE",
  "OPTIONS",
  "POST",
  "PATCH",
];

const application: Application = {
  use: (path: string, middleware: RequestListener) => {
    requestListenner.mount(path, middleware);
  },

  listen: (port: number) => {
    server.createServer(port, requestListenner.onRequest);
  },
};

httpVerbs.forEach((httpVerb) => {
  application[httpVerb] = (path: string, handler: RequestHandler) => {
    // path puede ser por ejemplo /users/:id/sales
    if (typeof handler === "function") {
      requestListenner.handle(httpVerb, path, handler);
    }
  };
});

export default application;
