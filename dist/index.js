"use strict";

var _expressGraphql = require("express-graphql");

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cors = require('cors');

var express = require("express");

var app = express();
app.get("/", function (req, res) {
  res.json({
    message: "hi"
  });
});
app.use(cors());
app.use("/graphql", (0, _expressGraphql.graphqlHTTP)({
  graphiql: true,
  schema: _schema["default"]
}));
var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Server on ".concat(port, " port"));
});
//# sourceMappingURL=index.js.map