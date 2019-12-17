const dotenv = require('dotenv');
dotenv.config();

require('./server')

module.exports = {
  telegram_api_token: process.env.TELEGRAM_API_KEY
};