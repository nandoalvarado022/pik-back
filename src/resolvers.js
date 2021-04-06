const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken");
const mysql = require('mysql2/promise');
const rn = require('random-number');

const conection = mysql.createPool({
  host: "sql357.main-hosting.eu",
  database: "u411078622_pikajuegos",
  user: "u411078622_pikajuegos",
  password: "Nandito2007"
})

export const resolvers = {
  Query: {
    hello: () => {
      return "Hi"
    },
    greet: () => {
      return "Saludo"
    },
    publications: async (root, { slug, phone }) => {
      let query = "SELECT * FROM publications"
      if (slug) query = query + ` where slug = '${slug}'`
      if (phone) query = query + ` where phone = '${phone}'`
      let res = await conection.query(query)
      res = res[0]
      return res
    },
    validateLogin: async (root, { phone, code }) => {
      const userForToken = { phone, code }
      const res = await conection.query(`SELECT * FROM users WHERE phone = "${phone}" and login_code = "${code}"`);
      if (res[0].length > 0) {
        const token = jwt.sign(userForToken, process.env.JWTSecretKey)
        await conection.query(`UPDATE users SET token = "${token}" WHERE phone = "${phone}"`);
        const obj = {
          ...res[0][0],
          token
        }
        return JSON.stringify(obj)
      }
    }
  },
  Mutation: {
    createPublication: async (_, { input }, context) => {
      // Token vaildation
      const Authorization = context.headers && context.headers.authorization ? context.headers.authorization : null
      console.log(`Autorizacion: ${Authorization}`)
      await conection.query("INSERT INTO publications SET ?", input);
      return JSON.stringify(input)
    },
    setLoginCode: async (_, { phone }) => { // this function is use to create users as well
      const login_code = rn({ min: 1000, max: 9999, integer: true })
      const accountSid = process.env.accountSid;
      const authToken = process.env.authToken;
      const client = require('twilio')(accountSid, authToken);

      /*client.messages
        .create({
          body: `El codigo es: ${login_code}`,
          to: '+573187414972'
        })
        .then(message => console.log(message.sid))
        .done();*/

      const user = await conection.query(`SELECT * FROM users WHERE phone = "${phone}"`);
      if (user[0].length > 0) {
        await conection.query(`UPDATE users SET login_code = ${login_code} WHERE phone = ${phone}`);
      } else {
        await conection.query("INSERT INTO users SET ?", { phone, login_code });
      }
      return `El codigo es: ${login_code}`
    }
  }
}