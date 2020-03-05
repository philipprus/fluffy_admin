const giftCardService = require('../service/giftcard.service');


const getGiftCards = async (req, res) => {
      try {
        const result = await giftCardService.getGiftCards({});
            return res.status(200).send(result);
          } catch (e) {
            console.log(e);
            return res.sendStatus(400);
          } 
}

const createGiftCard = async (req, res) => {
  const giftCard = req.body;
      try {
        const created = await giftCardService.create(giftCard);
            return res.status(200).send(created);
          } catch (e) {
            console.log(e);
            return res.sendStatus(400);
          } 
}

const getGiftCardById = async (req,res) => {
  const id = req.params.id;
  try {
    const giftCard = await giftCardService.getGiftCardById(id);
    return res.status(200).send(giftCard);
  } catch (e) {
    return res.sendStatus(400);
  }
}

const updateGiftCard = async (req,res) => {
  const giftCard = req.body;
  try { 
    const replaced = await giftCardService.update(giftCard);
    if (!replaced || !replaced.ok || !replaced.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
} 

const getStatusGiftCardByCoupon = async (req,res) => {
  const id = req.params.id;
  try {
    const giftCard = await giftCardService.getStatusGiftCardByCoupon(id);
    return res.status(200).send(giftCard);
  } catch (e) {
    return res.sendStatus(400);
  }
}

const checkGiftCard = async (req,res) => {
  const id = req.params.id;
  const amount = req.params.amount;
  try {
    const giftCard = await giftCardService.checkAmountByCoupon(id, amount);
    return res.status(200).send(giftCard);
  } catch (e) {
    return res.sendStatus(400);
  }
}

const deleteGiftCard =  async (req, res) => {
  const id = req.params.id;
  try { 
    const deleted = await giftCardService.deleteById(id);
    if (!deleted || !deleted.ok || !deleted.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
}

module.exports =  { createGiftCard, getGiftCards, getGiftCardById, getStatusGiftCardByCoupon, deleteGiftCard,  updateGiftCard, checkGiftCard };
