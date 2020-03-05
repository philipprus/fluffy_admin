const GiftCard = require('../model/giftcard.model');
const { mongo } = require('mongoose');
const couponGenerator = require('../utils/couponGenerator');

const getGiftCards = async query => {
  try {
    const giftCards = await GiftCard.find(query).exec();
    return giftCards;
  } catch (e) {
    console.log(e);
    throw Error('Error get giftCards');
  }
};

const getGiftCardById = async id => {
  try {
    const _id = new mongo.ObjectId(id);
    const giftCard = await GiftCard.findById({ _id }).exec();
    return giftCard;
  } catch (e) {
    console.log(e);
    throw Error('Error get giftCards');
  }
};

const getStatusGiftCardByCoupon = async coupon => {
  try {
    const giftCard = await GiftCard.find({ coupon: coupon }).exec();
    if (giftCard.length > 0) {
      const { amount, expireDate } = giftCard[0];
      if (amount === 0) return { amount: 0, status: 'Sorry, this Giftcard is empty' };
      if (!isDateAvailable(expireDate)) return { amount: 0, status: 'Your Giftcard is expired' };
      return { amount: amount, status: `Card Statement: ${amount} ils` };
    } else {
      return { amount: 0, status: 'Sorry, I cannot find this Giftcard number' };
    }
  } catch (e) {
    console.log(e);
    throw Error('Error get giftCards');
  }
};

const checkAmountByCoupon = async (coupon, amountClient) => {
  try {
    const giftCard = await GiftCard.find({ coupon: coupon }).exec();
    const { amount, expireDate } = giftCard[0];
    if (!isAmountAvailable(amountClient, amount)) return false;
    if (!isDateAvailable(expireDate)) return false;
    return true;
  } catch (e) {
    console.log(e);
    throw Error('Error get giftCards');
  }
};

const create = async giftCard => {
  try {
    const created = await GiftCard.insertMany(giftCard);
    return created;
  } catch (e) {
    console.log(e);
    throw Error('Error add giftCard');
  }
};

const update = async giftCard => {
  try {
    const giftCardDB = await GiftCard.find({ coupon: giftCard.coupon }).exec();
    const { amount, expireDate } = giftCardDB[0];
    if (!isAmountAvailable(giftCard.amount, amount) || !isDateAvailable(expireDate)) return false;
    const diffAmount = amount - giftCard.amount;
    const _id = new mongo.ObjectId(giftCardDB[0]._id);
    giftCard['amount'] = diffAmount;
    const replaced = await GiftCard.updateOne({ _id }, { $set: giftCard }).exec();
    return replaced;
  } catch (e) {
    // Log Errors
    console.log(e);
    throw Error('Error update GiftCard');
  }
};

const deleteById = async id => {
  try {
    const _id = new mongo.ObjectId(id);

    const deleted = await GiftCard.deleteOne({ _id }).exec();
    return deleted;
  } catch (e) {
    // Log Errors
    console.log(e);
    throw Error('Error update GiftCard');
  }
};

const isAmountAvailable = (amountClient, amountCoupon) => {
  return amountClient <= amountCoupon;
};

const isDateAvailable = dateCoupon => {
  const today = new Date();
  const expiry = new Date(dateCoupon);
  return today.getTime() < expiry.getTime();
};

module.exports = {
  create,
  update,
  getGiftCards,
  getGiftCardById,
  getStatusGiftCardByCoupon,
  checkAmountByCoupon,
  deleteById
};
