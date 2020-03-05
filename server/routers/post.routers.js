const express = require('express');
const postController = require('../controller/post.controller');

const post =  express.Router();

post.get('/:id', postController.getPostById);
post.get('/', postController.getPosts);
post.post('/', postController.createPost);
post.put('/', postController.updatePost);
     

module.exports =  post;