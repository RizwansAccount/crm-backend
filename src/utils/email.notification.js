import nodemailer from 'nodemailer';

const transporterEmail = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rizsid16@gmail.com',
            pass: 'mdsg bsxb kyod hgcz'
        }
    });
    return transporter;
};

const emailTemplate = (userName, message) => `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
        body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        }
        .email-container {
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 20px;
        background-color: #f9f9f9;
        }
        .header {
        text-align: center;
        background-color: #4CAF50;
        color: white;
        padding: 10px 0;
        border-radius: 10px 10px 0 0;
        }
        .content {
        margin: 20px 0;
        }
        .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
        }
    </style>
    </head>
    <body>
    <div class="email-container">
        <div class="header">
        <h1>Welcome to Our Service</h1>
        </div>
        <div class="content">
        <p>Hi ${userName},</p>
        <p>${message}</p>
        </div>
        <div class="footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
    </div>
    </body>
    </html>
`;

const getMailOptions = ({ email, subject, userName, message }) => ({
    from: 'rizsid16@gmail.com',
    to: email,
    subject: subject ?? 'Account Verification',
    html: emailTemplate(userName, message)
});

const sendMail = async ({ email, subject, userName, message }) => {
    try {
        const mailOptions = getMailOptions({ email, subject, userName, message });
        await transporterEmail.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
};

export { transporterEmail, getMailOptions, sendMail };