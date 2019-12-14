const coinr = require('coinr');

const coin = {

    getInfo: async function (id, cb) {
        if (!id || id === '') {
            console.error('Invalid Coin Identifier');
            return null;
        }
        else {
            return await coinr(id)
        }
    },

    getPrice: async function (id) {
        const info = await coin.getInfo(id)
        return {
            price_usd: info.price_usd,
            price_btc: info.price_btc
        }
    },

    convert: async function (coin_1, coin_1_amount, coin_2) {
        if (coin_1.toUpperCase() == coin_2.toUpperCase()) {
            let err = new Error('Both are same coin');
            return err
        }

        if (coin_1.toUpperCase().includes('USD')) {
            const { price_usd, price_btc } = await coin.getPrice(coin_2)
            if (price_usd)
                return coin_1_amount / price_usd;
            else
                return new Error('Invalid second coin or Coin Not found');
        }

        else {
            const { price_usd, price_btc } = await coin.getPrice(coin_1)

            if (!price_usd) {
                return new Error('Invalid first coin or Coin Not found');
            }

            if (coin_2.toUpperCase() == 'BTC') {
                return price_btc * coin_1_amount
            }

            else if (coin_2.toUpperCase() == 'USD') {
                return price_usd * coin_1_amount;
            }

            let coin_1_value = price_usd * coin_1_amount;

            price_2 = coin.getPrice(coin_2)
            if (price_2) {
                let coin_2_amt = coin_1_value / price_2.price_usd;
                return coin_2_amt
            }
            else {
                return new Error('Invalid Second coin or Coin Not found');
            }
        }

    }

};


module.exports = coin;
