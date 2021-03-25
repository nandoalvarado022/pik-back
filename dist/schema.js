"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTools = require("graphql-tools");

var _resolvers = require("./resolvers");

var typeDefs = "\n    type Query {\n        hello: String\n        greet(name: String): String\n        publications(slug: String): [Publications]\n    }\n\n    type Mutation {\n        createPublication(input: PublicationInput) : [Publications]\n    }\n    \n    type Publications {\n        is_new: Boolean\n        description: String\n        image_2: String\n        image_3: String\n        image_4: String\n        image_5: String\n        image_link: String\n        price: Int\n        quantity: Int\n        sale_price: String\n        slug: String\n        tags: String\n        title: String\n        type: String\n    }\n\n    input PublicationInput {\n        is_new: Boolean\n        description: String\n        image_link: String\n        price: Int\n        quantity: Int\n        sale_price: String\n        slug: String\n        tags: String\n        title: String\n        type: String\n    }\n";

var _default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: _resolvers.resolvers
});

exports["default"] = _default;
//# sourceMappingURL=schema.js.map