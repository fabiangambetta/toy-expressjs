"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/application/index"));
console.log("app", index_1.default);
index_1.default.GET('/cositas', (req, res, next) => {
    console.log("pasé por ac{a");
    next();
}, (req, res, next) => {
    res.send('Escuche en cositas y te respondo');
});
index_1.default.GET('/bolso/:id', (req, res, next) => {
    console.log("pasé por ac{a");
    next();
}, (req, res, next) => {
    console.log("pasé por ac{a");
    next();
}, (req, res, next) => {
    console.log("pasé por ac{a");
    next();
}, (req, res, next) => {
    console.log("pasé por ac{a");
    next();
}, (req, res, next) => {
    const { params } = req;
    const { id } = params;
    res.send('Respondo a /bolso/:id' + id);
});
index_1.default.GET('/bolso/:id/prueba/:name', (req, res, next) => {
    console.log("pasé por ac{a");
    next();
}, (req, res) => {
    const { params } = req;
    const { id } = params;
    res.send('respondo /bolso/:id/prueba/:name' + JSON.stringify(req.params));
});
index_1.default.PUT('/bolso', (req, res) => {
    res.send('Escuche en bolso y te respondo, PUT');
});
index_1.default.listen(3210);
//# sourceMappingURL=appExample.js.map