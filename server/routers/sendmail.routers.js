const express = require('express');
const sendmailController = require('../controller/sendmail.controller');

const sendMail =  express.Router();

sendMail.post('/contact', sendmailController.sendContactMail);

sendMail.post('/order', sendmailController.sendOrderMail);
sendMail.post('/giftCard', sendmailController.sendGiftCardMail);
     

module.exports =  sendMail;