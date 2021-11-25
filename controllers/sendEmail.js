const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')

// etherial is a fake smtp service which can be used as a transporter for sending emails during testing
// during production we use services like sendgrid
const sendEmailEtherial = async (req, res) =>{

    // let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ETH_USERNAME,
            pass: process.env.ETH_PASSWORD
        }
    })

    let info = await transporter.sendMail({
        from: '"Harshit Raj" <harshitraj712@gmail.com>',
        to: "bar@example.com",
        subject: 'Hello',
        html: '<h2>Sending emails with NodeJs</h2>'
    })

    res.json({info})
}

// using production level Sendgrid transporter to send the mails

// we can simply use sendgrid
// or we can simply use nodemailer
// in production sendgrid is preferred

const sendEmail = async (req, res) =>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: process.env.EMAIL_SECONDARY, // Change to your recipient
        from: process.env.EMAIL_PRIMARY, // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    const info = await sgMail.send(msg);
    res.json({info})
}

module.exports = sendEmail