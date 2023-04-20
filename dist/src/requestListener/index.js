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
    routesToHandle: {},
    handlers: {},
    middlewares: {},
    // Callback que se invoca siempre que se recibe una request
    listenner: (req, res) => {
        const { method, url } = req;
        if (!method || !url)
            throw new Error("method or url are empty on request");
        const handler = requestListener.routesToHandle[method][url];
        //@ts-ignore
        req.cosas = "fruta";
        if (typeof handler === "function")
            handler(req, res);
    },
    use: (path, handler) => {
        requestListener.middlewares[path] = handler;
    },
    handle: (method, path, handler) => {
        if (typeof handler !== "function")
            return;
        requestListener.routesToHandle[method] = {
            ...requestListener.routesToHandle[method],
            [path]: handler,
        };
    },
    handleV2: (method, path, handler) => {
        if (typeof handler !== "function")
            return;
        routeTree_1.default.add(requestListener.handlers[method], path, handler);
    },
};
httpVerbs.forEach((httpVerb) => {
    requestListener.handlers[httpVerb] = {
        value: "/",
        type: "ROOT",
        childrens: [],
    };
});
exports.default = requestListener;
