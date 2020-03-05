const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema(
  {
    created: { type: Date, default: Date.now },
    image: [{
      public_id: {
        type: String,
        required: [true],
      },
      original_image: {
        url: {
          type: String,
          required: [true],
        },
        height: {
          type: Number,
        },
        width: {
          type: Number,
        },
      },
      src: {
        type: String,
        required: [true],
      },
      height: {
        type: Number,
      },
      width: {
        type: Number,
      },
      thumbnail: {
        type: String,
        required: [true],
      },
      thumbnailWidth: {
        type: Number,
      },
      thumbnailHeight: {
        type: Number,
      },
    }],
    style: {
      type: String,
    },
    size: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const Portfolio = mongoose.model('Portfolio', PortfolioSchema, 'portfolio');

module.exports = Portfolio;
