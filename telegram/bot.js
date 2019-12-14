const bot = require('./telegram')
const conin_service = require('../services/coin_service')

const inline_keyboard = [
    [
        { text: "Convert coin prices", callback_data: "CONVERT_COIN" },
        { text: "Get coin info", callback_data: "COIN_INFO" }
    ]
]

bot.onText(/\/start/, (message) => {
    bot.sendMessage(message.chat.id, 'Hello, I can do these things', {
        reply_markup: { inline_keyboard }
    })
})

bot.on('callback_query', query => {

    const {message: {chat, message_id, text}= {}} = query
    
    switch (query.data) {
        case 'CONVERT_COIN':
            conversion_path(query)
            break;
        case 'CONVERT_COIN':
            info_path(query)
            break;
        default:
    }

})

const conversion_path = function(query){
    bot.sendMessage(query.message.chat.id,
        `which coin you want to convert?
         you can enter the ammount too
         you can also use 'USD' for converting to and from us dollars
        eg:- 1.12 eth
    `,{
        reply_markup: { force_reply: true}
    })
    .then(from_coin => {
        bot.onReplyToMessage(from_coin.chat.id, from_coin.message_id, from_coin_message => {
            const from_coin_text = from_coin_message.text
            bot.sendMessage(from_coin.chat.id, 'To which coin you want to convert to ?',{
                reply_markup:{
                    force_reply: true
                }
            })
            .then(to_coin=>{
                bot.onReplyToMessage(to_coin.chat.id, to_coin.message_id, async function(to_coin_message){
                    const to_coin_text = to_coin_message.text
                    const result = await conin_service.convert(from_coin_text, to_coin_text)

                    const message_body = `${result.from.amount} ${result.from.ticker} is equal to ${result.result} ${result.to.ticker}`

                    bot.sendMessage(to_coin.chat.id, message_body,{
                        reply_markup: { inline_keyboard }
                    })
                })
            })
        })
    })
}


const info_path = function(query){

}



module.exports = bot