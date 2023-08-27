const nodemailer = require("nodemailer");

const verificationTemplate = require("./templates/VerificationEmailTemplate");

const smtpOptions = {
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
};

const  transport = nodemailer.createTransport(smtpOptions);

transport.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Email server running");
    }
});

const sendEmail = async (template, options) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        html: html,
    };
    switch (template) {
        case "verification":
            mailOptions.html = verificationTemplate(options.name, options.token, options.email);
            break;
        default:
            break;
    }
    console.log(mailOptions)
}




module.exports = sendEmail;