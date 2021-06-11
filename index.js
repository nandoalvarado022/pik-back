const log4js = require("log4js")
const logger = log4js.getLogger();
const cors = require('cors')
const express = require("express");
const login = require("./login");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Pik" })
})

const options = {
  origin: ["https://pikajuegos.com", "https://twilio.com", "http://localhost"]
}

app.use(cors(options))
app.use("/graphql", graphqlHTTP({
  graphiql: true,
  schema
}))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server on ${port} port`))