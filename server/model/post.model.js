const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    created: { type: Date, default: Date.now },
    content: {
      type: String,
      required: [true],
    },
    excerpt: {
      type: String,
    },
    status: {
      type: String,
      enum: ['PUBLISH', 'DRAFT'],
      default: 'DRAFT',
      uppercase: true,
    },
    thumbnails: [
      {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },
    ],
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const Post = mongoose.model('Post', PostSchema, 'posts');

module.exports = Post;
