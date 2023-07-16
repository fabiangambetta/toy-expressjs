"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routeTree_1 = __importDefault(require("../utils/routeTree"));
const httpVerbs = [
    "GET",
    "PUT",
    "HEAD",
    "DELETE",
    "OPTIONS",
    "POST",
    "PATCH",
];
const requestListener = {
    handlers: {},
    middlewares: {},
    // Callback que se invoca siempre que se recibe una request
    onRequest: (req, res) => {
        const { method, url } = req;
        if (!method || !url)
            throw new Error("method or url are empty on request");
        const segments = getSegmentsFromUrl(url);
        const routeMetadata = routeTree_1.default.getRouteMetadata(requestListener.handlers[method], segments.filter((segment) => segment != ""));
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
        routeTree_1.default.add(requestListener.handlers[method], path, handler);
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
const getSegmentsFromUrl = (url) => {
    return url.split("/");
};
exports.default = requestListener;
//# sourceMappingURL=index.js.map