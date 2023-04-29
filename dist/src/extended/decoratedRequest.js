"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
class DecoratedRequest extends http_1.IncomingMessage {
    constructor() {
        super(...arguments);
        this.params = {};
    }
    /**
     * Set request parameters from an array of Param objects.
     *
     * @param {Array<Param>} params - An array of Param objects to set as request parameters.
     */
    setParams(params) {
        if (!Array.isArray(params)) {
            throw new Error('Invalid input: listOfParams must be an array of Param objects.');
        }
        params.forEach((param) => {
            if (!param || typeof param.name !== 'string' || typeof param.value === 'undefined') {
                throw new Error('Invalid input: Each param object must have a valid "name" and "value" property.');
            }
            // Ensure the parameter does not already exist to prevent overriding
            if (this.params.hasOwnProperty(param.name)) {
                throw new Error(`Duplicate parameter: "${param.name}" already exists in the request parameters.`);
            }
            this.params[param.name] = param.value;
        });
    }
}
exports.default = DecoratedRequest;
//# sourceMappingURL=decoratedRequest.js.map