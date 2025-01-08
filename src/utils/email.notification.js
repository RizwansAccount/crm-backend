import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporterEmail = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.env.transportMail,
            pass: config.env.transportPassword
        }
    });
    return transporter;
};

const welcomeEmailTemplate = (userName) => `
   <!DOCTYPE html>
    <html>
    <head>
    <style>
        body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color: #333;
        }
        .email-wrapper {
        width: 100%;
        padding: 20px;
        }
        .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
        background-color: #4A6DA7;
        padding: 20px;
        text-align: center;
        color: white;
        }
        .email-header h1 {
        margin: 0;
        font-size: 24px;
        }
        .email-body {
        padding: 20px;
        }
        .email-body h2 {
        color: #4A6DA7;
        font-size: 20px;
        margin-top: 0;
        }
        .email-body p {
        font-size: 16px;
        line-height: 1.6;
        }
        .email-footer {
        background-color: #f4f4f4;
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #777;
        }
        .email-footer a {
        color: #4A6DA7;
        text-decoration: none;
        }
    </style>
    </head>
    <body>
    <div class="email-wrapper">
        <div class="email-container">
        <div class="email-header">
            <h1>Welcome to Mercury Sols</h1>
        </div>
        <div class="email-body">
            <h2>Hello ${userName},</h2>
            <p>We are thrilled to have you join the Mercury Sols family! Our team is committed to providing you with exceptional service and support every step of the way.</p>
            <p>Feel free to reach out if you have any questions or need assistance. We look forward to a fantastic journey together!</p>
            <p>Best Regards,<br> The Mercury Sols Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; <a href="https://www.mercurysols.org" target="_blank">Visit Our Website</a></p>
        </div>
        </div>
    </div>
    </body>
    </html>
`;

const sendMail = async ({ email, subject, template }) => {
    try {
        const mailOptions = {
            from: config.env.transportMail,
            to: email,
            subject: subject ?? 'Account Verification',
            html: template
        };
        await transporterEmail.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
};

export {
    sendMail, welcomeEmailTemplate
};