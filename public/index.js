"use strict";

var mysql = require("mysql");

var express = require("express");

var conection = mysql.createConnection({
  host: "sql357.main-hosting.eu",
  database: "u411078622_pikajuegos",
  user: "u411078622_pikajuegos",
  password: "Nandito2007"
});
conection.connect(function (err) {
  if (err) {
    throw err;
  }
});
var app = express();
app.listen(3000, function () {
  return console.log("Server on 3000 port");
});
conection.end();
//# sourceMappingURL=index.js.map