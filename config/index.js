const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  telegram_api_token: process.env.TELEGRAM_API_KEY
};