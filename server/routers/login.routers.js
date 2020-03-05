const express = require('express');
const loginController = require('../controller/login.controller');

const loginAPI =  express.Router();

loginAPI.post('/', loginController.login);
loginAPI.post('/auth', loginController.auth);
     

module.exports =  loginAPI;
