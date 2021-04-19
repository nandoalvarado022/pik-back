const log4js = require("log4js")
const logger = log4js.getLogger();
const cors = require('cors')
const express = require("express");
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const app = express()
app.use(cors())

const login = require("./login")

app.post("/whatsapp/connect", login.conectApi)
app.post('/login/sendmessage', login.sendMessage);
app.post('/login/validateLogin', login.validateLogin);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Pik" })
})

app.use("/graphql", graphqlHTTP({
  graphiql: true,
  schema
}))

const port = process.env.PORT || 3000

app.listen(port, () => {
  logger.info('##########################################################');
  logger.info('#####               STARTING SERVER                  #####');
  logger.info('##########################################################\n');
  console.log(`Server on ${port} port`)
})