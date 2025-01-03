import crypto from 'crypto';

const getRandomCode = () => crypto.randomBytes(3).toString('hex');

export { getRandomCode };