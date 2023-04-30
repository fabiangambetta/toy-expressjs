import server from "../server/index";
import requestListenner from "../requestListener/index";
import { RequestListener } from "http";
import {
  Application,
  AppRouteHandle,
  HttpMethod,
  RequestHandler,
} from "../types";

const httpVerbs: HttpMethod[] = [
  "GET",
  "PUT",
  "HEAD",
  "DELETE",
  "OPTIONS",
  "POST",
  "PATCH",
];

const AppRoute: AppRouteHandle = {
  use: (path: string, middleware: RequestListener) => {
    requestListenner.mount(path, middleware);
  },

  listen: (port: number) => {
    if (!Number.isInteger(port) || port <= 0) {
      throw new Error("Port must be a positive integer.");
    }
    server.createServer(port, requestListenner.onRequest);
  },
};

const httpMethods: Partial<Application> = {};

httpVerbs.forEach((httpVerb) => {
  httpMethods[httpVerb] = (path: string, handler: RequestHandler) => {
    if (typeof path !== "string" || path.trim() === "") {
      throw new Error("Path must be a non-empty string.");
    }

    if (typeof handler !== "function") {
      throw new Error("Handler must be a function.");
    }

    // path puede ser por ejemplo /users/:id/sales
    requestListenner.handle(httpVerb, path, handler);
  };
});

const application: Application = {
  ...AppRoute,
  ...httpMethods,
} as Application;

export default application;
