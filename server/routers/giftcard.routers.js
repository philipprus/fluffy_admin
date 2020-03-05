const express = require('express');
const giftCardController = require('../controller/giftcard.controller');

const giftCard =  express.Router();

giftCard.get('/status/:id', giftCardController.getStatusGiftCardByCoupon);
giftCard.get('/checked/:id/:amount', giftCardController.checkGiftCard);
giftCard.get('/:id', giftCardController.getGiftCardById);
giftCard.get('/', giftCardController.getGiftCards);
giftCard.post('/', giftCardController.createGiftCard);
giftCard.put('/', giftCardController.updateGiftCard);
giftCard.delete('/:id', giftCardController.deleteGiftCard);

module.exports =  giftCard;