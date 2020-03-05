import {priceTable} from '../components/common/priceTable';
import { addDays, differenceInDays } from "date-fns";

const summeryOrder = (values) => { 
      let sum = 0
      if(values.style && values.canvasSize) {
          sum = sum + priceTable[values.style][values.canvasSize];
          sum = sum + sum*( (values.extraPet-1)*0.5);
     
      }
      if(isDateInThisWeek(values.dispatch_date)) {
            sum = sum + sum*1
      }
      if(isDateInAfterWeek(values.dispatch_date)) {
            sum = sum + sum*0.5;
      }
      if(values.isGift) {
        if(values.addCard) {
          sum = sum + 5;
        }
        if(values.addPaper) {
            sum = sum +5;
        }
      }
      if (sum < 0) return 0;

      return sum;
  }

  const isDiscountBigPrice = (discount, price) => {
        if(discount > price) {
              return true
        } else {
              return false
        }
  }

   const shipping = (type) => {
        switch(type) {
            case "israelPost":
              return 40;
            case "pickup": 
            default: 
                  return 0;
        }
  }

  const isDateInThisWeek = (date) => {
      const nowDay = new Date().setHours(0,0,0,0);
      const momentToday = addDays(nowDay, 4);
      const week = addDays(momentToday, 6);
      if(date < momentToday) {
            return false
      }
      if (date === week) {
            return true;
      }
        return date <= week;
  }

  const isDateInAfterWeek = (date) => {
      const nowDay = new Date().setHours(0,0,0,0);
      const momentToday = addDays(nowDay, 4);
      const week = addDays(momentToday, 6);
      const week2 = addDays(momentToday, 9);
      return week < date  && date <= week2;
  }

const dispatchDescription = (date) => isDateInThisWeek(date) ? "+ 100% (extra fast)" : isDateInAfterWeek(date) ? "+ 50% (fast)" : "Free";

const averageNowDispatch = (dispatch) => {
      var result = differenceInDays(
            new Date(dispatch),
            new Date()
          );

          return result;
}

function couponGenerator() {
      return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            // eslint-disable-next-line no-mixed-operators
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
}

  export { summeryOrder, isDateInThisWeek,isDateInAfterWeek, dispatchDescription, averageNowDispatch, shipping, isDiscountBigPrice, couponGenerator};