const express = require('express');
const orderController = require('../controller/order.controller');

const order =  express.Router();

order.get('/status/:id', orderController.checkOrder);
order.get('/:id', orderController.getOrderById);
order.get('/', orderController.getOrders);
order.post('/', orderController.createOrder);
order.put('/', orderController.updateOrder);
order.delete('/:id', orderController.deleteOrder);
     

module.exports =  order;