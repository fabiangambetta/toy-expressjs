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
  routesToHandle: {} as RouteHandlers,
  handlers: {} as Record<HttpMethod, RouteNode>,
  middlewares: {},

  // Callback que se invoca siempre que se recibe una request
  onRequest: (req: DecoratedRequest, res) => {
    const { method, url } = req;
    if (!method || !url) throw new Error("method or url are empty on request");
    const segments = ((url as unknown) as string ).split("/");

    const routeMetadata = routeTree.getRouteMetadata(
      requestListener.handlers[method as HttpMethod],
      segments.filter(segment => segment!='')
    );
    req.setParams(routeMetadata.params);
    //
    if (typeof routeMetadata.handler === "function") routeMetadata.handler(req, res);
  },

  mount: (path, handler) => {
    requestListener.middlewares[path] = handler;
  },

  handle: (method, path, handler) => {
    if (typeof handler !== "function") return;
    routeTree.add(requestListener.handlers[method], path, handler);
  },
};

httpVerbs.forEach((httpVerb) => {
  requestListener.handlers[httpVerb] = {
    value: "/",
    type: "ROOT",
    childrens: [],
  };
});

export default requestListener;
