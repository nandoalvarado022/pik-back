const mysql = require('mysql2/promise');

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
    publications: async(root, { slug }) => {
      let query = "SELECT * FROM publications"
      if (slug) query = query + ` where slug = '${slug}'`
      let res = await conection.query(query)
      res = res[0]
      return res
    }
  },
  Mutation: {
    createPublication: async(_, { input }) => {
      await conection.query("INSERT INTO publications SET ?", input);
      return input
    },
    setLoginCode: async(_, { phone, login_code }) => { // this function is use to create users as well
      const user = await conection.query(`SELECT * FROM users WHERE phone = ${phone}`);
      if (user[0].length > 0) {
        await conection.query(`UPDATE users SET login_code = ${login_code} WHERE phone = ${phone}`);
      } else {
        await conection.query("INSERT INTO users SET ?", { phone, login_code });
        return input
      }
      return login_code
    }
  }
}