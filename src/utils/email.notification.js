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

export { transporterEmail };