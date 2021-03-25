const cors = require('cors')
const express = require("express");
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const app = express()

app.get("/", (req, res) => {
  res.json({ message: "hi" })
})

app.use(cors())

app.use("/graphql", graphqlHTTP({
  graphiql: true,
  schema
}))

app.listen(3000, () => console.log("Server on 3000 port"))