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
        index_1.default.createServer(port, index_2.default.onRequest);
    },
};
httpVerbs.forEach((httpVerb) => {
    application[httpVerb] = (path, handler) => {
        // path puede ser por ejemplo /users/:id/sales
        if (typeof handler === "function") {
            index_2.default.handle(httpVerb, path, handler);
        }
    };
});
exports.default = application;
//# sourceMappingURL=index.js.map