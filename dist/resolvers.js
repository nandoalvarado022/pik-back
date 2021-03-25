"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mysql = require('mysql2/promise');

var conection = mysql.createPool({
  host: "sql357.main-hosting.eu",
  database: "u411078622_pikajuegos",
  user: "u411078622_pikajuegos",
  password: "Nandito2007"
});
var resolvers = {
  Query: {
    hello: function hello() {
      return "Hi";
    },
    greet: function greet() {
      return "Saludo";
    },
    publications: function () {
      var _publications = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, _ref) {
        var slug, query, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                slug = _ref.slug;
                query = "SELECT * FROM publications";
                if (slug) query = query + " where slug = '".concat(slug, "'");
                _context.next = 5;
                return conection.query(query);

              case 5:
                res = _context.sent;
                res = res[0];
                return _context.abrupt("return", res);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function publications(_x, _x2) {
        return _publications.apply(this, arguments);
      }

      return publications;
    }()
  },
  Mutation: {
    createPublication: function () {
      var _createPublication = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
        var input;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref2.input;
                _context2.next = 3;
                return conection.query("INSERT INTO publications SET ?", input);

              case 3:
                return _context2.abrupt("return", input);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createPublication(_x3, _x4) {
        return _createPublication.apply(this, arguments);
      }

      return createPublication;
    }()
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=resolvers.js.map