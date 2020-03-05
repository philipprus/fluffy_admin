const mongoose = require("mongoose");


const GiftCardSchema =  new mongoose.Schema({
      created: { type: Date, default: Date.now },
      coupon: {
            type: String,
            required: [true],
            unique: [true]
      },
      message: {
            type: String
      },
      from: {
            type: String,
      },
      to: {
            type: String,
            required: [true],

      },
      amount: {
            type: Number,
            required: [true]
      },
      expireDate: {
            type: Date, default: () => Date.now() + 183*24*60*60*1000,
            required: [true]
      },
      payment_type: {
            type: String,
            required: [true]
      },
      payment_number: {
            type: String,
      },
      payment_description: {
            type: Object
      },
      billingAddress_firstName: {
            type: String,
            required: [true]
      },
      billingAddress_lastName: {
            type: String,
            required: [true]
      },
      billingAddress_email: {
            type: String,
            required: [true]
      },
      billingAddress_phone: {
            type: String,
            required: [true]
      },
      status: {
            type: String,
            default: "not paid"
      },
},{
      versionKey: false // You should be aware of the outcome after set to false
    });

const GiftCard =  mongoose.model('GiftCard', GiftCardSchema, "giftcards");

module.exports = GiftCard;