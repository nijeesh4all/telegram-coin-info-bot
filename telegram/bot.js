const bot = require('./telegram')

bot.onText(/\/start/, (message)=>{
    bot.sendMessage(message.chat.id, 'Hello')
})




module.exports = bot