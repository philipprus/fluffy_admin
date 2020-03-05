const mailjet = require('node-mailjet').connect(
      process.env.MJ_APIKEY_PUBLIC || "d57258af14a4c6d36fd34421de27943d", 
      process.env.MJ_APIKEY_PRIVATE || "715cce06d16c14c6a859be775ea18be5", 
      {
      url: 'api.mailjet.com', // default is the API url
      version: 'v3.1', // default is '/v3'
      perform_api_call: true // used for tests. default is true
});

const buildMessage = (recipients, htmlPart, subject) => {

      let res = [];

      recipients.forEach( recipient => {
            const message = {
                        "From": {
                           "Email": "no-reply@fluffy.co.il",
                           "Name": "Fluffy.co.il"
                         },
                         "To": [
                            {
                               "Email": recipient.Email,
                               "Name": recipient.Name
                            }
                         ],
                         "Subject": subject,
                         "HTMLPart": htmlPart
                     }
            
            res.push(message);

      });

      return res;
};

const request = (messages) => mailjet.post("send", {'version': 'v3.1'}).request({"Messages": messages});

const sendContactMail = async ({name, email, phone, comments = "", isCopy = false}) => {
      const contact = { name, email, phone, comments, isCopy };
      
      let recipients = [{"Email": "info@fluffy.co.il", "Name": "Fluffy Web Site"}];
      
      if(isCopy) recipients.push({"Email": email, "Name": name});
      
      const htmlPart = (contact) => `<h3>Contact Form</h3>
                        <p>Name: ${contact.name}</p>
                        <p>Phone: ${contact.phone}</p>
                        <p>Email: ${contact.email}</p>
                        <p>Comments: ${contact.comments}</p>
                        `;

      const messages = buildMessage(recipients, htmlPart(contact), "Contact Form Fluffy");
      try {
            const result = await request(messages);
            return result;
      } catch (e) {
            console.log(e);
            throw Error("Error send mail");
      }
}


const  {builderHtml, getSubjectEmail, builderGiftHtml} = require("../utils/builderEmailOrder.js")

const sendOrderMail = async (order) => {
      const htmlOrder = builderHtml(order);
      let recipients = [{
            "Email": order.billingAddress_email, "Name": `${order.billingAddress_firstName} ${order.billingAddress_lastName}`
      }];
      if(order.status === "not paid") {
            recipients = [{"Email": "order@fluffy.co.il", "Name": "New Order"}];
      }
      let messages = buildMessage(recipients, htmlOrder, getSubjectEmail(order.status));
      try {
            const result = await request(messages);
            return result;
      } catch (e) {
            console.log(e);
            throw Error("Error send mail");
      }
}

const sendGiftCardMail = async (giftCard) => {
      console.log(1);
      const htmlGiftCardHtml = builderGiftHtml(giftCard);
      let recipients = [{
            "Email": giftCard.to
      }];
            // recipients.push([{"Email": "order@fluffy.co.il", "Name": "New Gift Card"}]);
      let messagesGiftCard = buildMessage(recipients, htmlGiftCardHtml, `Hi, ${giftCard.from} sent you a gift!`);
      try {
            const result = await request(messagesGiftCard);
            return result;
      } catch (e) {
            console.log(e);
            throw Error("Error send mail");
      }
}




module.exports = {sendContactMail, sendOrderMail, sendGiftCardMail};