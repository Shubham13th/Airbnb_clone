const sendEmail = async (options) => {
    // 1. Create Transporter
    let transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
        try {
            const nodemailer = require('nodemailer');
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            // 2. Define Email Options
            const mailOptions = {
                from: `${process.env.FROM_NAME || 'Airbnb Clone'} <${process.env.FROM_EMAIL || 'noreply@airbnbclone.com'}>`,
                to: options.email,
                subject: options.subject,
                text: options.message,
            };

            // 3. Send Email
            await transporter.sendMail(mailOptions);
            return;
        } catch (error) {
            console.error("Nodemailer error:", error);
            // Fallback to mock if real email fails? Or rethrow? 
            // Let's rethrow to let controller handle it, or fall through to mock log if desireable.
            // For now, let's just log and fall through to mock for safety in dev.
            console.log("Falling back to mock email...");
        }
    }

    // Mock Transporter for Development (when keys are missing or failed)
    console.log('----------------------------------------------------');
    console.log('WARNING: No SMTP Credentials found or Sending Failed');
    console.log('Simulating Email Send...');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message: ${options.message}`);
    console.log('----------------------------------------------------');
};

module.exports = sendEmail;

module.exports = sendEmail;
