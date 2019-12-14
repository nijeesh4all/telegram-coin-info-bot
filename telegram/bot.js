const bot = require('./telegram')
const coin_service = require('../services/coin_service')

const inline_keyboard = [
    [
        { text: "Convert coins", callback_data: "CONVERT_COIN" },
        { text: "Get coin info", callback_data: "COIN_INFO" },
        { text: "Get coin prices", callback_data: "COIN_PRICE"}

    ]
]

bot.onText(/\/start/, (message) => {
    bot.sendMessage(message.chat.id, 'Hello, I can do these things', {
        reply_markup: { inline_keyboard }
    })
})

bot.on('callback_query', query => {

    const { message: { chat, message_id, text } = {} } = query

    switch (query.data) {
        case 'CONVERT_COIN':
            conversion_path(query)
            break;
        case 'COIN_INFO':
            info_path(query)
            break;
        case 'COIN_PRICE':
            price_path(query)
            break;
        default:
    }

})

const conversion_path = function (query) {
    bot.sendMessage(query.message.chat.id,`
         which coin you want to convert?
         you can enter the ammount too
         you can also use 'USD' for converting to and from us dollars
        eg:- 1.12 eth
    `, {
        reply_markup: { force_reply: true }
    })
        .then(from_coin => {
            bot.onReplyToMessage(from_coin.chat.id, from_coin.message_id, from_coin_message => {
                const from_coin_text = from_coin_message.text
                bot.sendMessage(from_coin.chat.id, 'To which coin you want to convert to ?', {
                    reply_markup: {
                        force_reply: true
                    }
                })
                    .then(to_coin => {
                        bot.onReplyToMessage(to_coin.chat.id, to_coin.message_id, async function (to_coin_message) {
                            const to_coin_text = to_coin_message.text
                            const result = await coin_service.convert(from_coin_text, to_coin_text)

                            let message_body = ""
                            if (typeof result.result !== 'Error') {
                                message_body = `${result.from.amount} ${result.from.ticker} is equal to ${result.result} ${result.to.ticker}`
                            } else {
                                message_body = result.result.message
                            }

                            bot.sendMessage(to_coin.chat.id, message_body, {
                                reply_markup: { inline_keyboard }
                            })
                        })
                    })
                    .catch(console.log)
            })
        })
        .catch(console.log)
}


const info_path = function (query) {
    bot.sendMessage(query.message.chat.id, `About which crypto you want to know more about`, {
        reply_markup: {
            force_reply: true
        }
    })
        .then((info_coin) => {
            bot.onReplyToMessage(info_coin.chat.id, info_coin.message_id, async function (info_coin_message) {
                const coin = info_coin_message.text
                const info = await coin_service.info(coin)

                let message_body = ""
                if (typeof info !== 'Error') {
                    message_body = `
                    Info for ${info.id} are
                    Name        :   ${info.name}
                    Symbol      :   ${info.symbol}
                    Rank        :   ${info.rank}
                    Price USD   :   ${info.price_usd}
                    price BTC   :   ${info.price_btc}
                    Market Cap  :   ${info.market_cap_usd}
                    Max Supply  :   ${info.max_supply}
                    `

                } else {
                    message_body = info.message
                }


                bot.sendMessage(info_coin.chat.id, message_body, {
                    reply_markup: { inline_keyboard }
                })
            })
        })
        .catch(console.log);
}

const price_path = function (query) {
    bot.sendMessage(query.message.chat.id, "About which crypto's you want to know more about", {
        reply_markup: {
            force_reply: true
        }
    })
        .then((info_coin) => {
            bot.onReplyToMessage(info_coin.chat.id, info_coin.message_id, async function (info_coin_message) {
                const coin = info_coin_message.text
                const info = await coin_service.info(coin)

                let message_body = ""
                if (typeof info !== 'Error') {
                    message_body = `
                    Info for ${info.id} are
                    Price USD   :   ${info.price_usd}
                    price BTC   :   ${info.price_btc}
                    `

                } else {
                    message_body = info.message
                }


                bot.sendMessage(info_coin.chat.id, message_body, {
                    reply_markup: { inline_keyboard }
                })
            })
        })
        .catch(console.log);
}



module.exports = bot