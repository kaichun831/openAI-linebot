const request = require('request');
require('dotenv').config();

const KEY = process.env.OPENAI_API_KEY;
// function requestChat(content) {
//     const options = {
//         url: 'https://api.openai.com/v1/chat/completions',
//         json: true,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${KEY}`
//         },
//         body: {
//             "model": "gpt-3.5-turbo-0301",
//             "messages": [{ "role": "user", "content": content }]
//         }
//     };

//     request.post(options, (err, res, body) => {
//         if (err) {
//             return console.log(err);
//         }
//         console.log(`Status: ${res.statusCode}`);
//         const replyMessage = body.choices[0].message.content;
//         console.log(replyMessage);
//         return replyMessage
//     });
// }

exports.requestChat = function (content) {
    const options = {
        url: 'https://api.openai.com/v1/chat/completions',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${KEY}`
        },
        body: {
            "model": "gpt-3.5-turbo-0301", // gpt-3.5-turbo or gpt-3.5-turbo-0301
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