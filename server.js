require('dotenv').config();
const express = require('express');
const linebot = require('linebot')
const bodyParser = require('body-parser')
const model = require('./src/model/requestModel')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// model.requestChat('可以用嗎').then((replay) => {
//     // event.reply(replay.toString())
// }).catch((err) => {
//     console.log('抱歉，我暫時無法操作。')
//     // event.reply('抱歉，我暫時無法操作。');
// });


let bot = linebot({
    channelId: process.env.LINE_CHANNELID,
    channelSecret: process.env.LINE_CHANNELSECRET,
    channelAccessToken: process.env.LINE__ACCESS_TOKEN
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
    if (event.message.text != undefined) {
        try {
            if (event.message.text.includes("欸")) {
                var eventMessage = event.message.text.replace('欸', '')
                model.requestChat(eventMessage).then((replay) => {
                    event.reply(replay.toString())
                }).catch((err) => {
                    console.log(err)
                    event.reply('抱歉，我暫時無法操作。');
                });
            } else if (event.message.text.includes("創")) {
                var eventMessage = event.message.text.replace('創', '')
                model.requestImage(eventMessage).then((replay) => {
                    event.reply({
                        type: 'image',
                        originalContentUrl: replay,
                        previewImageUrl: replay
                    })
                }).catch((err) => {
                    console.log(err)
                    event.reply('抱歉，我暫時無法創造圖片。');
                });
            }
        } catch (error) {
            console.log(error)
            event.reply('抱歉，我暫時無法操作。');
        }
    }

});