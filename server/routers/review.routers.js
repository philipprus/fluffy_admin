const express = require('express');
const reviewController = require('../controller/review.controller');

const review =  express.Router();

review.get('/:id', reviewController.getReviewById);
review.get('/', reviewController.getReviews);
review.post('/', reviewController.createReview);
review.put('/', reviewController.updateReview);
review.delete('/:id', reviewController.deleteById);

module.exports =  review;