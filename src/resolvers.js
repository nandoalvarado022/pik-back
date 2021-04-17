const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken");
const mysql = require('mysql2/promise');
const rn = require('random-number');

const conection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
})

export const resolvers = {
  Query: {
    publications: async (root, { slug, phone, status, category }) => {
      let query = `SELECT u.picture as user_picture, u.phone as user_phone, p.* FROM publications AS p
      INNER JOIN users AS u ON
      p.phone COLLATE utf8mb4_general_ci = u.phone`
      query = query + " where p.id IS NOT NULL"
      if (slug && slug != "") query = query + ` and p.slug = "${slug}"`
      if (phone) query = query + ` and p.phone = "${phone}"`
      if (status) query = query + ` and p.status = ${status}`
      if (category) query = query + ` and p.type = "${category}"`
      query = query + " order by p.created_at desc"
      let res = []
      try {
        res = await conection.query(query)
      } catch (error) {
        console.error(error);
      }
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
      // const fields = {
      //   description: input.description
      // }
      const { id, isEdit } = input
      delete input.isEdit
      delete input.id
      const Authorization = context.headers && context.headers.authorization ? context.headers.authorization : null
      console.log(`Autorizacion: ${Authorization}`)
      !isEdit && await conection.query("INSERT INTO publications SET ?", input);
      isEdit && await conection.query(`UPDATE publications SET ? WHERE id=${id}`, input)
      return JSON.stringify(input)
    },
    setLoginCode: async (_, { phone }) => { // this function is use to create users as well
      const login_code = rn({ min: 1000, max: 9999, integer: true })
      const accountSid = process.env.accountSid;
      const authToken = process.env.authToken;
      const client = require('twilio')(accountSid, authToken);
      const body = `Tu código de verificacion Pikajuegos es: ${login_code} **** 
Pikajuegos nunca te pedirá tu código de verificación fuera del sitioweb.`
      const sendMessage = () => {
        client.messages
          .create({
            body,
            messagingServiceSid: process.env.messagingServiceSid,
            to: phone
          })
          .then(message => console.log(message.sid))
          .done();
      }

      sendMessage() // Enviando el SMS

      const user = await conection.query(`SELECT * FROM users WHERE phone = "${phone}"`);
      if (user[0].length > 0) {
        await conection.query(`UPDATE users SET login_code = ${login_code} WHERE phone = ${phone}`);
      } else {
        await conection.query("INSERT INTO users SET ?", { phone, login_code });
      }
      return login_code
    },
    changeStatePublication: async (_, { id, status }) => {
      const user = await conection.query(`UPDATE publications SET status = ${status} WHERE id = ${id}`);
    }
  }
}