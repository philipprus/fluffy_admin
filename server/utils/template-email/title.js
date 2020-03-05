const CONSTANT = require('../contsText');

const Title = (type) => {
      switch (type) {
      case CONSTANT.STATUS_NEW:
      case CONSTANT.STATUS_NOT_PAID:
          return CONSTANT.HEADER_TITLE_NEW;
      case CONSTANT.STATUS_IN_DELIVERY:
          return CONSTANT.HEADER_TITLE_IN_DELIVERY;
      case CONSTANT.STATUS_READY_TO_DISPATCH:
          return CONSTANT.HEADER_TITLE_READY_TO_DISPATCH;
      case CONSTANT.STATUS_NOT_CONFIRMED:
          return CONSTANT.HEADER_TITLE_NOT_CONFIRMED;
      case CONSTANT.STATUS_IN_PROCESS:
          return CONSTANT.HEADER_TITLE_IN_PROCESS;
      case CONSTANT.STATUS_COMPLETE:
      default:
          return CONSTANT.HEADER_TITLE_COMPLETE;
      } 
}

module.exports = { Title };
