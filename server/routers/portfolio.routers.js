const express = require('express');
const portfolioController = require('../controller/portfolio.controller');

const portfolio =  express.Router();

portfolio.get('/', portfolioController.getPortfolios);
portfolio.get('/:id', portfolioController.getPortfolioById);
portfolio.post('/', portfolioController.createPortfolio);
portfolio.put('/', portfolioController.updatePortfolio);
portfolio.delete('/:id', portfolioController.deletePortfolio);
     

module.exports =  portfolio;