"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
class DecoratedResponse extends http_1.ServerResponse {
    constructor(req) {
        super(req);
    }
    send(data) {
        this.writeHead(200, { "Content-Type": "application/json" });
        this.end(JSON.stringify(data));
    }
}
exports.default = DecoratedResponse;
//# sourceMappingURL=decoratedResponse.js.map