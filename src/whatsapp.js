const fetch = require('node-fetch')
const WhatsAppWeb = require('baileys')
const rn = require('random-number')

const client = new WhatsAppWeb()

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
	const API_URL = "http://localhost:3000/graphql/"
	const random_num = rn({ min: 1000, max: 9999, integer: true })
	// saving login code in user
	await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
      mutation {
				setLoginCode(phone: "${phone}", login_code: ${random_num})
      }`
		})
	})
	await res.json()
	const message = `Tu código de verificación Pik es: ${random_num}

*Pikajuegos nunca te pedirá tu código de verificación fuera de su sitio web. 
Nunca lo compartas por mensaje o teléfono`

	const options = {
		quoted: null,
		timestamp: new Date()
	}
	client.sendTextMessage(`${phone}@s.whatsapp.net`, message, options)
		.then(res.jsonp({ mensaje: 'Notificación enviada' }))
}