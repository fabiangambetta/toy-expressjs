"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/application/index"));
index_1.default.GET("/cositas", (req, res, next) => {
    console.log("Primer Handler");
    next();
}, (req, res, next) => {
    console.log("Segundo Handler");
    next();
}, (req, res, next) => {
    res.send("Tercer handler");
});
index_1.default.GET("/bolso/:id", (req, res, next) => {
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
    res.send("Respondo a /bolso/:id" + id);
});
index_1.default.GET("/bolso/:id/prueba/:name", (req, res, next) => {
    console.log("pasé por ac{a");
    next();
}, (req, res) => {
    const { params } = req;
    const { id, name } = params;
    res.send("respondo /bolso/:id/prueba/:name" + name + id);
});
index_1.default.PUT("/bolso", (req, res) => {
    res.send("Escuche en bolso y te respondo, PUT");
});
index_1.default.listen(3210);
//# sourceMappingURL=appExample.js.map