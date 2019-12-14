const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });
bot.isAuthenticated = true;

bot.on('message', (msg) => {
    console.log('Message recived from ' + msg.from.username + ' :', msg.text);

});

bot.on('error', (error) => {
    console.error(error)
})

bot.on('polling_error', (error) => {
    console.error('Error :', error.message);  // => 'EFATAL'
});

export default bot;