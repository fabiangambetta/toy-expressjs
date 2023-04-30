"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/application/index"));
console.log("app", index_1.default);
index_1.default.GET('/cositas', (req, res) => {
    res.send('Escuche en cositas y te respondo');
});
index_1.default.GET('/bolso/:id', (req, res) => {
    const { params } = req;
    const { id } = params;
    res.send('Escuche en bolso y te respondo, again' + id);
});
index_1.default.GET('/bolso/:id/prueba/:name', (req, res) => {
    const { params } = req;
    const { id } = params;
    res.send('Escuche en bolso y te respondo, again  ' + JSON.stringify(req.params));
});
index_1.default.PUT('/bolso', (req, res) => {
    res.send('Escuche en bolso y te respondo, PUT');
});
index_1.default.listen(3210);
//# sourceMappingURL=appExample.js.map