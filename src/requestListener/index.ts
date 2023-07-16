import DecoratedRequest from "../extended/decoratedRequest";
import {
  HttpMethod,
  RequestListenner,
  RouteHandlers,
  RouteNode,
} from "../types";
import routeTree from "../utils/routeTree";
const httpVerbs: Array<HttpMethod> = [
  "GET",
  "PUT",
  "HEAD",
  "DELETE",
  "OPTIONS",
  "POST",
  "PATCH",
];

const requestListener: RequestListenner = {
  handlers: {} as Record<HttpMethod, RouteNode>,
  middlewares: {},

  // Callback que se invoca siempre que se recibe una request
  onRequest: (req, res) => {
    const { method, url } = req;
    if (!method || !url) throw new Error("method or url are empty on request");
    const segments = getSegmentsFromUrl(url);

    const routeMetadata = routeTree.getRouteMetadata(
      requestListener.handlers[method as HttpMethod],
      segments.filter((segment) => segment != "")
    );
    req.setParams(routeMetadata.params);
    if (typeof routeMetadata.handler === "function")
      routeMetadata.handler(req, res);
  },

  // Asigna un middleware a una ruta específica
  mount: (path, handler) => {
    requestListener.middlewares[path] = handler;
  },

  // Asigna un handler a un método y ruta específicos
  handle: (method, path, handler) => {
    routeTree.add(requestListener.handlers[method], path, handler);
  },
};

// Se crea el root de cada arbol por método
httpVerbs.forEach((httpVerb) => {
  requestListener.handlers[httpVerb] = {
    value: "/",
    type: "ROOT",
    childrens: [],
  };
});

const getSegmentsFromUrl = (url: string): Array<string> => {
  return url.split("/");
};
export default requestListener;
