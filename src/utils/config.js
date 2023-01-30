"use strict";
exports.__esModule = true;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
var CONFIG = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    OTP_SALT: process.env.OTP_SALT,
    BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS) || 12
};
exports["default"] = CONFIG;
