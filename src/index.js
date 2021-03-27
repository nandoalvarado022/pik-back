const cors = require('cors')
const express = require("express");
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const app = express()

const whatsapp = require("./whatsapp")

app.post("/whatsapp/connect", whatsapp.conectApi)
app.post('/whatsapp/sendmessage', whatsapp.sendMessage);

app.get("/", (req, res) => {
  res.json({ message: "hi" })
})

app.use(cors())

app.use("/graphql", graphqlHTTP({
  graphiql: true,
  schema
}))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server on ${port} port`))