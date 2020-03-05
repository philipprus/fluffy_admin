const Portfolio = require('../model/portfolio.model');
const { mongo } = require('mongoose');

const getPortfolios = async query => {
  try {
    const portfolios = await Portfolio.find(query).exec();
    return portfolios;
  } catch (e) {
    console.log(e);
    throw Error('Error get portfolios');
  }
};

const getPortfolioById = async id => {
  try {
    const _id = new mongo.ObjectId(id);
    const portfolio = await Portfolio.findById({ _id }).exec();
    return portfolio;
  } catch (e) {
    console.log(e);
    throw Error('Error get portfolios');
  }
};

const create = async portfolio => {
  try {
    const created = await Portfolio.insertMany(portfolio);
    return created;
  } catch (e) {
    console.log(e);
    throw Error('Error add portfolio');
  }
};


const update = async portfolio => {
  try {
    const _id = new mongo.ObjectId(portfolio._id);
    const replaced = await Portfolio.updateOne({ _id }, { $set: portfolio }).exec();
    return replaced;
  } catch (e) {
    // Log Errors
    throw Error('Error update Portfolio');
  }
};

const deleteById = async id => {
  try {
    const _id = new mongo.ObjectId(id);

    const deleted = await Portfolio.deleteOne({ _id }).exec();
    return deleted;
  } catch (e) {
    // Log Errors
    console.log(e);
    throw Error('Error update GiftCard');
  }
};


module.exports = { create, getPortfolios, getPortfolioById, update, deleteById };
