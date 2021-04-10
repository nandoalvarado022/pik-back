const fetch = require('node-fetch')
const WhatsAppWeb = require('baileys')

const client = new WhatsAppWeb()
const API_URL = "http://localhost:3000/graphql/"
// const API_URL = "https://pik-server.herokuapp.com/graphql/"

// CONECTA WHATS - SERVIDOR
module.exports.conectApi = async (req, res) => {
	client.connect()
		.then(([user, chats, contacts, unread]) => {
			res.jsonp({ mensaje: 'Autenticación exitosa' });
		})
		.catch(err => console.log(err))
}

// ENVIAR MENSAJES
module.exports.sendMessage = async (req, res) => {
	const phone = req.query.phone
	// saving login code in user
	let request = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
      mutation {
				setLoginCode(phone: "${phone}")
      }`
		})
	})
	request = await request.json()
	await res.send("Codigo es: " + request.data.setLoginCode)
	/*const message = ""
	const options = {
		quoted: null,
		timestamp: new Date()
	}
	client.sendTextMessage(`${phone}@s.whatsapp.net`, message, options)
		.then(res.jsonp({ mensaje: 'Notificación enviada' }))*/
}

module.exports.validateLogin = async (req, res) => {
	const { phone, code } = req.query
	let request = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
      query {
				validateLogin(phone: "${phone}", code: ${code})
      }`
		})
	})
	request = await request.json()
	request = JSON.parse(request.data.validateLogin)
	res.json(request)
}