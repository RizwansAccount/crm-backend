import crypto from 'crypto';

const getMailOptions = (email, verificationCode) => ({
    from: 'rizsid16@gmail.com',
    to: email,
    subject: 'Account Verification',
    text: `Your verification code is: ${verificationCode}`
});

const getRandomCode = () => crypto.randomBytes(3).toString('hex');

export { getMailOptions, getRandomCode };