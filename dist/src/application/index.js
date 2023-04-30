"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../server/index"));
const index_2 = __importDefault(require("../requestListener/index"));
const httpVerbs = [
    "GET",
    "PUT",
    "HEAD",
    "DELETE",
    "OPTIONS",
    "POST",
    "PATCH",
];
const application = {
    use: (path, middleware) => {
        index_2.default.mount(path, middleware);
    },
    listen: (port) => {
        if (!Number.isInteger(port) || port <= 0) {
            throw new Error("Port must be a positive integer.");
        }
        index_1.default.createServer(port, index_2.default.onRequest);
    },
};
httpVerbs.forEach((httpVerb) => {
    application[httpVerb] = (path, handler) => {
        if (typeof path !== "string" || path.trim() === "") {
            throw new Error("Path must be a non-empty string.");
        }
        if (typeof handler !== "function") {
            throw new Error("Handler must be a function.");
        }
        // path puede ser por ejemplo /users/:id/sales
        index_2.default.handle(httpVerb, path, handler);
    };
});
exports.default = application;
//# sourceMappingURL=index.js.map