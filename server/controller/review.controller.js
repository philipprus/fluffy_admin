const reviewService = require('../service/review.service');

const getReviews = async (req, res) => {
  try {
    const result = await reviewService.getReviews({});
    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

const createReview = async (req, res) => {
  const review = req.body;
  try {
    const created = await reviewService.create(review);
    return res.status(200).send(created);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

const getReviewById = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await reviewService.getReviewById(id);
    return res.status(200).send(review);
  } catch (e) {
    return res.sendStatus(400);
  }
};

const updateReview = async (req, res) => {
  const review = req.body;
  try {
    const replaced = await reviewService.update(review);
    if (!replaced || !replaced.ok || !replaced.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await reviewService.deleteById(id);
    if (!deleted || !deleted.ok || !deleted.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(400);
  }
};

module.exports = { createReview, getReviews, getReviewById, updateReview, deleteById };
