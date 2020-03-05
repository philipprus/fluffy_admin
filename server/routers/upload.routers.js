const express = require('express');
const uploadController = require('../controller/upload.controller');

const uploadImage =  express.Router();

uploadImage.post('/single-image', uploadController.singleImage);
     

module.exports =  uploadImage;