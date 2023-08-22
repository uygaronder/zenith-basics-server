const nodemailer = require("nodemailer");

const smtpOptions = {
    port: process.env.EMAIL_PORT,
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
};

const  transport = nodemailer.createTransport({smtpOptions});

transport.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

const sendEmail = async (email, subject, text, html) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
        html: html,
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}

console.log("Mailer Loaded");

module.exports = sendEmail;