export const testimonials = {
      paypal: "Paypal",
      vertical: "Vertical",
      pickup: "Pick up",
      horizontal: "Horizontal",
      israelpost: "Israel Post",
      new: "New",
      "not paid": "Not paid",
      sending: "Sending",
      inprocess: "In Process",
      not_confirmed: "Not confirmed",
      ready_to_dispatch: "Ready to dispatch",
      in_delivery: "In Delivery",
      complete: "Complete",
}

export function isEmpty(obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }
  
      return true;
  }


