const request = require('request');
require('dotenv').config();

const KEY = process.env.OPENAI_API_KEY;

exports.requestChat = function (content) {
    const options = {
        url: 'https://api.openai.com/v1/chat/completions',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${KEY}`
        },
        body: {
            "model": "gpt-3.5-turbo", // https://platform.openai.com/docs/models/model-endpoint-compatibility
            "messages": [{ "role": "user", "content": content }]
        }
    };

    return new Promise((resolve, reject) => {
        request.post(options, (err, res, body) => {
            if (err) {
                reject("失敗")
                console.log(err)
            }
            console.log(body)
            // console.log(`Status: ${res.statusCode}`);
            try {
                const replyMessage = body.choices[0].message.content;
                console.log(replyMessage);
                resolve(replyMessage)
            } catch (err) {
                reject(err)
            }

        });
    });

}

exports.requestImage = function (content) {
    const options = {
        url: 'https://api.openai.com/v1/images/generations',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${KEY}`
        },
        body: {
            "prompt": content,
            "n": 1,
            "size": "512x512"
        }
    };

    return new Promise((resolve, reject) => {
        request.post(options, (err, res, body) => {
            if (err) {
                reject("失敗")
                console.log(err)
            }
            // console.log(body)
            try {
                const replyWebUrl = body.data[0].url;
                console.log(replyWebUrl);
                resolve(replyWebUrl)
            } catch (err) {
                reject(err)
            }

        });
    });

}