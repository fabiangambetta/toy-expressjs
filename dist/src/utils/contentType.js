"use strict";
const getContentType = (data) => {
    if (typeof data === "string" && !JSON.parse(data))
        return "text/plain";
    if (typeof data === "string" && JSON.parse(data))
        return "application/json";
};
//# sourceMappingURL=contentType.js.map