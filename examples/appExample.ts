import application from "../src/application/index";

application.GET(
  "/cositas",
  (req, res, next) => {
    console.log("Primer Handler");
    next();
  },
  (req, res, next) => {
    console.log("Segundo Handler");
    next();
  },
  (req, res, next) => {
    res.send("Tercer handler");
  }
);

application.GET(
  "/bolso/:id",
  (req, res, next) => {
    console.log("pasé por ac{a");
    next();
  },
  (req, res, next) => {
    console.log("pasé por ac{a");
    next();
  },
  (req, res, next) => {
    console.log("pasé por ac{a");
    next();
  },
  (req, res, next) => {
    console.log("pasé por ac{a");
    next();
  },
  (req, res, next) => {
    const { params } = req;
    const { id } = params;
    res.send("Respondo a /bolso/:id" + id);
  }
);

application.GET(
  "/bolso/:id/prueba/:name",
  (req, res, next) => {
    console.log("pasé por ac{a");
    next();
  },
  (req, res) => {
    const { params } = req;
    const { id, name } = params;
    res.send("respondo /bolso/:id/prueba/:name" + name + id);
  }
);

application.PUT("/bolso", (req, res) => {
  res.send("Escuche en bolso y te respondo, PUT");
});
application.listen(3210);
