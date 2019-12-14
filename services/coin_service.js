const coin = require('../coin')

async function convert(from, to){
    const from_object = parse_amount_and_ticker(from)
    const to_object   = parse_amount_and_ticker(to)
    
    return result = {
        from : from_object,
        to: to_object,
        result: await coin.convert(from_object.ticker, from_object.amount, to_object.ticker)
    }
}

function parse_amount_and_ticker(string = ''){
    var amount = string.match(/\d+/g) || [1] ;
    var ticker =  string.match(/[a-zA-Z]+/g) || ['BTC'] ;

    amount = parseInt(amount[0])
    ticker = ticker[0]

    return {amount, ticker}
}



module.exports = {
    convert
}