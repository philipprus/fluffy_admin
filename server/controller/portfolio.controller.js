const portfolioService = require('../service/portfolio.service');

const getPortfolios = async (req, res) => {
  try {
    const result = await portfolioService.getPortfolios({});
    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

const createPortfolio = async (req, res) => {
  const portfolio = req.body;
  portfolio['_id'] = undefined;
  try {
    const created = await portfolioService.create(portfolio);
    return res.status(200).send(created);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

const getPortfolioById = async (req, res) => {
  const id = req.params.id;
  try {
    const portfolio = await portfolioService.getPortfolioById(id);
    return res.status(200).send(portfolio);
  } catch (e) {
    return res.sendStatus(400);
  }
};

const updatePortfolio = async (req, res) => {
  const portfolio = req.body;
  try {
    const replaced = await portfolioService.update(portfolio);
    if (!replaced || !replaced.ok || !replaced.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(400);
  }
};

const deletePortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await portfolioService.deleteById(id);
    if (!deleted || !deleted.ok || !deleted.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

module.exports = {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
};
