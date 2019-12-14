const bot = require('./bot.js/index.js.js');
const coin =require('./coins.js');

bot.onText(/[p,P]rice (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  let message = '';
    coin.getPrice(resp,(usd,btc)=>{
       if(usd || btc)
           message = 'Price of '+resp.toUpperCase()+' is \n'+'USD\t:\t'+usd+'\nBTC\t:\t'+btc;
        else
            message = 'Invalid coin Name';
        bot.sendMessage(chatId, message);
    });
});

bot.onText(/[i,I]nfo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  var message = '';
  coin.getInfo(resp,info=>{
      if(info)
           message = "\nInfo for " + info.id + " are\nName        :   " + info.name + "\nSymbol      :   " + info.symbol + "\nRank        :   " + info.rank + "\nPrice USD   :   " +                 info.price_usd + " $\nprice BTC   :   " + info.price_btc + "\nMarket Cap  :   " + info.market_cap_usd + "\nMax Supply  :   " + info.max_supply + "\n\n";
      else
          message = 'Invalid Coin Name';
    bot.sendMessage(chatId, message);
  });
});


bot.onText(/[cvt,Cvt,Convert,convert] (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  let resp = match[1];
  let message ='';
  resp = resp.split(' ');
  resp =  resp.filter(el=>{
      return (el && el.toUpperCase()!='TO' && el!='=');
  });

    for(let i=0;i<resp.length;i++ ){
        if(resp[i] == '$'){
            resp[i] = 'USD';
        }
    }


//     if(resp.length<=2 || !isNaN(resp[0])){
//         return bot.sendMessage(chatId, 'Invalid Message Format');
//     }
    coin.convert(resp[1],parseInt(resp[0]),resp[2],(err,val)=>{
        if(err){
            message = err.message;
            console.log(err);
            bot.sendMessage(chatId, message);
            throw err;
        }
        else{
            message = ''+resp[0]+' '+resp[1].toUpperCase()+'\t = \t'+val+' '+resp[2].toUpperCase();
            bot.sendMessage(chatId, message);
        }
    });
});


bot.onText(/[h,H]elp/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
 bot.sendMessage(chatId, help_msg);

});



let help_msg ="\n---------------------  \n\t\t\tHELP\n---------------------\n\n1) INFO\n\ninfo <Identifier>\neg: info eth\n\nInfo for ethereum are\nName        :   Ethereum\nSymbol      :   ETH\nRank        :   2\nPrice USD   :   866.667 $\nprice BTC   :   0.0873397\nMarket Cap  :   84101220160.0\nMax Supply  :   null\n\n2) Price\n\nprice <Identifier>\neg: price eth\n\nPrice of ETH is \nUSD : 866.667\nBTC : 0.0873397\n\n3) Convert\n\ncvt / convert\n\neg : cvt  1 eth to btc\n\t\t\t\t\tor\n\t\t\tconvert 1 eth = btc ";

module.exports = bot;
