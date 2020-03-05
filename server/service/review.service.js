const Review = require('../model/review.model');
const { mongo } = require('mongoose');

const getReviews = async query => {
  try {
    const reviews = await Review.find(query).sort({created: -1}).exec();
    return reviews;
  } catch (e) {
    console.log(e);
    throw Error('Error get reviews');
  }
};

const getReviewById = async id => {
  try {
    const _id = new mongo.ObjectId(id);
    const review = await Review.findById({ _id }).exec();
    return review;
  } catch (e) {
    console.log(e);
    throw Error('Error get reviews');
  }
};

const create = async review => {
  try {
    const created = await Review.insertMany(review);
    return created;
  } catch (e) {
    console.log(e);
    throw Error('Error add review');
  }
};

const update = async review => {
  try {
    const _id = new mongo.ObjectId(review._id);
    const replaced = await Review.updateOne({ _id }, { $set: review }).exec();
    return replaced;
  } catch (e) {
    // Log Errors
    console.log(e);
    throw Error('Error update Review');
  }
};

const deleteById = async id => {
      try {
        const _id = new mongo.ObjectId(id);
        const deleted = await Review.deleteOne({ _id }).exec();
        return deleted;
      } catch (e) {
        // Log Errors
        console.log(e);
        throw Error('Error update Review');
      }
    };

module.exports = { create, update, getReviews, getReviewById, deleteById };
