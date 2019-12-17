// Fake server for redirecting to the bot on telegram

var http = require('http');

const PORT = process.env.PORT || 5000
const bot_name = process.env.TELEGRAM_BOT_NAME

console.log(`Server is gonna run on port ${PORT}`)

//create a server object:
http.createServer(function (req, res) {
    res.writeHead(301,
        {Location: `http://t.me/${bot_name}` }
      );
      res.end();
  res.end(); //end the response
}).listen(PORT);

//the server object listens on port 8080 