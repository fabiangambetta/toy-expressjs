"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
class DecoratedRequest extends http_1.IncomingMessage {
    constructor() {
        super(...arguments);
        this._params = [];
    }
    get getParams() {
        return this._params;
    }
    set setParams(params) {
        this._params = params;
    }
}
exports.default = DecoratedRequest;
