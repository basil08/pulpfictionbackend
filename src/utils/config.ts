// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const CONFIG = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  OTP_SALT: process.env.OTP_SALT || 'otp-secret',
  BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS) || 12,
};

export default CONFIG;
