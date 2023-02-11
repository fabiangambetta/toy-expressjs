const response = require("../src/extended/response");
const server = require("../src/server/index");

server.createServer(
  function(req, res){
    res.send("Respuesta usando el response extendido___: "+ req.url);
  },
  3212,
  "listenning"
);
