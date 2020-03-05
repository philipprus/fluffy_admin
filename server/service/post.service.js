const Post = require('../model/post.model');
const { mongo } = require('mongoose');

const getPosts = async query => {
  try {
    const posts = await Post.find(query).exec();
    return posts;
  } catch (e) {
    console.log(e);
    throw Error('Error get posts');
  }
};

const getPostById = async id => {
  try {
    const _id = new mongo.ObjectId(id);
    const post = await Post.findById({ _id }).exec();
    return post;
  } catch (e) {
    console.log(e);
    throw Error('Error get posts');
  }
};

const create = async post => {
  try {
    const created = await Post.insertMany(post);
    return created;
  } catch (e) {
    console.log(e);
    throw Error('Error add post');
  }
};

const update = async post => {
  try {
    const _id = new mongo.ObjectId(post._id);
    const replaced = await Post.updateOne({ _id }, { $set: post }).exec();
    return replaced;
  } catch (e) {
    // Log Errors
    console.log(e);
    throw Error('Error update Post');
  }
};

const deleteById = async id => {
      try {
        const _id = new mongo.ObjectId(id);
        const deleted = await Post.deleteOne({ _id }).exec();
        return deleted;
      } catch (e) {
        // Log Errors
        console.log(e);
        throw Error('Error update Review');
      }
    };


module.exports = { create, update, getPosts, getPostById, deleteById };
