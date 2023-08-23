const verificationEmailTemplateHTML = (name, token) => {
    return `
        <div>
        <h3>Hi ${name},</h3>
        <h4>Welcome To Zenith Basics!</h4>
        <p>
            Please verify your email by clicking the link below.
        </p>
        <a href="${process.env.API_URL}/verify/${token}">Verify Email</a>
        </div>
    `;
    }


const verificationEmailJson = (name, token, email) => {
    return {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Email Verification",
        html: verificationEmailTemplateHTML(name, token),
    };
}

module.exports = verificationEmailJson;