const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  console.log(event);
  if(event.type == 'message'){
    return client.broadcast({
        type:'text',
    text:event.message.text
    })
  }
  // return client.replyMessage(event.replyToken,{
  //   type:'text',
  //   text:event.message.text
  // })
}

app.listen(process.env.Port || 3000,()=>{
    console.log(`listen on port ${process.env.Port || 3000}`);
});