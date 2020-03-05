const uploadImage = require("./upload.routers");
const sendMail = require("./sendmail.routers");
const order = require("./order.routers");
const loginAPI = require("./login.routers");
const giftCardAPI = require('./giftcard.routers');
const reviewAPI = require('./review.routers');
const postAPI = require('./post.routers');
const portfolioAPI = require('./portfolio.routers');
const routers = [
  {
    prefix: "/upload",
    router: uploadImage
  },
  {
    prefix: "/sendmail",
    router: sendMail
  },
  {
    prefix: "/order",
    router: order
  },
  {
    prefix: "/login",
    router: loginAPI
  },
  {
    prefix: "/giftCard",
    router: giftCardAPI
  },
  {
    prefix: "/review",
    router: reviewAPI
  },
  {
    prefix: "/post",
    router: postAPI
  },
  {
    prefix: "/portfolio",
    router: portfolioAPI
  }
];


module.exports = routers;