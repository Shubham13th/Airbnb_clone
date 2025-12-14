const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
    const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL, // Must be verified in SendGrid
        subject,
        text,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent to', to);
    } catch (error) {
        console.error('Email send error:', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

module.exports = { sendEmail };
