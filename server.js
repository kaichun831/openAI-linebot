require('dotenv').config();
const express = require('express');
const linebot = require('linebot')
const bodyParser = require('body-parser')
const model = require('./src/model/requestModel')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let bot = linebot({
    channelId: '1660722989',
    channelSecret: '81cc379d15ec8c3e1cd565080a64b9d8',
    channelAccessToken: '/Lz8CA70q7rrtZWzsFMezs/uzlcgxx68Xx6VNEaxdirvkdzDZB0lu4C7tPeGTw+P+wQapBXiXrW+ZJQbur0AHqzF8NMDFon+8Untkw7Uv7A21DgYFcmv+JKB1VvWCBjwsRlZmn8Pnf8LQyDDJd0HpQdB04t89/1O/w1cDnyilFU='
});




const PORT = 8080
app.listen(PORT);
console.log(`START LISTEN PORT:${PORT}`)

app.get('/', function (req, res) {
    res.send(`SERVER IS RUNNING ON ${PORT}`);
});
const parser = bodyParser.json({
    verify: function (req, res, buf, encoding) {
        req.rawBody = buf.toString(encoding);
    }
});

app.post('/webhook', parser, function (req, res) {
    bot.parse(req.body);
    return res.send({});
});
bot.on('message', function (event) {
    console.log(event.message.text)
    try {
        if (event.message.text.includes("欸")) {
            model.requestChat(event.message.text).then((replay) => {
                event.reply(replay.toString())
            }).catch((err) => {
                console.log(err)
                event.reply('抱歉，我暫時無法操作。');
            });
        }
    } catch (error) {
        console.log(error)
        event.reply('抱歉，我暫時無法操作。');
    }

});