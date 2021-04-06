// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = "ACb64fd0efad9e9e2ca10db8a956e3ac13"
const authToken = "4c92654481c958b40ba23864d7ca6ef1"
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        from: 'whatsapp:+14155238886',
        body: 'Hello there!',
        to: 'whatsapp:+573187414972'
    })
    .then(message => console.log(message.sid));