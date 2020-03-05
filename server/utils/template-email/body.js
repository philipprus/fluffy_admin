const CONSTANT = require('../contsText');
const moment = require('moment');
const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'dxxwojaqv',
  api_key: process.env.API_KEY || '611291973937328',
  api_secret: process.env.API_SECRET || 'ZBPj7AjIGWuu5ITNl_b74ILgyNs',
});

const getBody = order => {
  switch (order.status) {
    case CONSTANT.STATUS_NEW:
    case CONSTANT.STATUS_NOT_PAID:
      return BODY_NEW(order);
    case CONSTANT.STATUS_IN_PROCESS:
      return BODY_IN_PROCESS(order);
    case CONSTANT.STATUS_READY_TO_DISPATCH:
      return BODY_READY_TO_DISPATCH(order);
    case CONSTANT.STATUS_COMPLETE:
      return BODY_COMPLETE(order);
    case CONSTANT.STATUS_IN_DELIVERY:
      return BODY_IN_DELIVERY(order);
    case CONSTANT.STATUS_NOT_CONFIRMED:
      return BODY_NOT_CONFIRMED(order);
    default:
      return;
  }
};

const BODY_NEW = order => {
  return `
  ${orderInformation(order)}
  ${wrapperUpperBody}
  ${tableBody(order)}
  ${wrapperDownBody}
  ${checkStatus(order)}
  `;
};

const BODY_IN_PROCESS = order => {
  return `
  ${orderInformation(order)}
  ${wrapperUpperBody}
  ${tableBody(order)}
  ${wrapperDownBody}
  ${checkStatus(order)}
  `;
};

const BODY_READY_TO_DISPATCH = order => {
  return `
  ${orderInformation(order)}
  ${wrapperUpperBody}
  ${tableBody(order)}
  ${wrapperDownBody}
  ${checkStatus(order)}
  `;
};

const BODY_COMPLETE = order => {
  return `
  ${wrapperUpperBody}
  <p> Dear ${order.billingAddress_firstName}, thank you again for your order!
  <br/> I really hope you are happy with the result of the Fluffy painting!
  <p></p> If you have just a minute I would be very greatfull for your short review on Fluffy.co.il/review
  <br/> And moreover, if you download a photo of your ready artwork. </p>
  ${wrapperDownBody}
  `;
};

const BODY_IN_DELIVERY = order => {
  return `
  ${orderInformation(order)}
  ${wrapperUpperBody}
  ${tableBodyTrackingNumber(order)}
  ${wrapperDownBody}
  ${checkStatus(order)}
  `;
};

const BODY_NOT_CONFIRMED = order => {
  return `
  ${orderInformation(order)}
      ${wrapperUpperBody}
      ${order.notice}
      ${wrapperDownBody}
      ${checkStatus(order)}
      `;
};

const orderInformation = order => {
  return `
<div style="
padding: 0px 25px;
">
  <table
    cellpadding="0" cellspacing="0" width="100%" border="0" style="padding: 10px 25px; text-align: left; color:#000000;font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;table-layout:auto;width:100%;border:none;"
  >
    <tr style="text-align:left;padding:15px 0;font-size: 14px;">
          <th style="padding:0 15px 0 0;font-size: 14px;width: 25%;">Order number</th>
          <th style="padding: 0 15px;font-size: 14px;">Date</th>
          <th style="padding: 0 15px;font-size: 14px;">Total</th>
          <th style="padding: 0 0 0 15px;font-size: 14px;">Payment Method</th>
        </tr>
        <tr>
          <td style="padding: 0 15px 0 0;font-size: 14px;">${order._id}</td>
          <td style="padding: 0 15px;font-size: 14px;">${order.created &&
            moment(new Date(order.created)).format('DD/MM/YYYY')}</td>
          <td style="padding: 0 15px;font-size: 14px;">${order.order_total}</td>
          <td style="padding: 0 0 0 15px;font-size: 14px;">${
            config.testimonials[order.payment_type]
          }</td>
        </tr>
  </table>
</div>
`;
};

const displayCongratulation = order => {
  if (!order.сongratulation) return;
  return ` <tr>
        <td
          align="left"
          style="font-size:0px;padding:5px 25px;word-break:break-word;"
        >
          <div style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;">
            <strong>Greeting text:</strong> ${order.сongratulation}
          </div>
        </td>
      </tr>`;
};

const displayDiscount = order => {
  if (!order.discount) return;
  return ` <tr><td
      align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;" colspan="2"
      >
   <div
      style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
      ><strong>Discount:</strong> -${order.discount}$</div>
</td></tr>`;
};
const displayCoupon = order => {
  if (!order.coupon) return;

  return `<tr>
   <td
      align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;" colspan="2"
      >
      <div
         style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
         ><strong>Gift card:</strong> <a href="//check-gift-card/${order.coupon}">${order.coupon}</a></div>
   </td>
</tr>`;
};

const displayComments = order => {
  if (!order.comments) return;
  return `
   <tr>
   <td
      align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;"
      >
      <div
         style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
         ><strong>Comments:</strong> ${order.comments}</div>
   </td>
</tr>`;
};

const tableBody = order => {
  return `
   <div
   style=""
   >
   <!--[if mso | IE]>
   <table
      align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
      <tr>
         <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            <div  style="margin:0px auto;max-width:600px;">
               <table
                  align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
                  >
                  <tbody>
                     <tr>
                        <td
                           style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"
                           >
                           <!--[if mso | IE]>
                           <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                 <td
                                    class="" style="vertical-align:top;width:600px;"
                                    >
                                    <![endif]-->
                                    <div
                                       class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                                       >
                                       <table
                                          cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;table-layout:auto;width:100%;border:none;"
                                          >
                                          <tr style="text-align:center;">
                                             <th style="">Reference Photo</th>
                                             <th style="">Style: ${order.style}</th>
                                          </tr>
                                          <tr>
                                             <td style="">
                                             <div>
                                             ${cloudinary.image(`${order.photo [0].public_id}.png`, {
                                               width: 256,
                                               height: 145,
                                               crop: 'pad',
                                               background: 'white',
                                             })}
                                                </div>
                                                </td>
                                             <td style="">
                                                <img src="${GET_IMAGE_STYLE(order.style)}" alt="${
    order.style
  }" align="center" border="none" width="256px" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0" />
                                             </td>
                                          </tr>
                                       </table>
                                       <table
                                          border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
                                          >
                                        
                                          <tr>
                                          <td
                                             align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;"
                                             >
                                             <div
                                                style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
                                                ><strong>Canvas size:</strong> 
                                                    ${order.canvasSize}
                                                 </div>
                                          </td>
                                       </tr>
                                       <tr>
                                       <td
                                          align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;"
                                          >
                                          <div
                                             style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
                                             ><strong>Position:</strong> ${
                                               order.canvasPosition
                                             }</div>
                                       </td>
                                    </tr>
                                    <tr>
                                    <td
                                       align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;"
                                       >
                                       <div
                                          style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
                                          ><strong>Extra pet:</strong> ${order.extraPet}</div>
                                    </td>
                                 </tr>
                                 ${displayComments(order)}
                                 ${displayCongratulation(order)}
                                          <tr>
                                             <td
                                                align="left" style="font-size:0px;padding:20px 25px;word-break:break-word;" colspan="2"
                                                >
                                                <div
                                                   style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:center;color:#000000;"
                                                   ><strong>Dispatch date:</strong> ${order.dispatch_date &&
                                                     moment(new Date(order.dispatch_date)).format(
                                                       'DD/MM/YYYY'
                                                     )} or before</div>
                                             </td>
                                          </tr>
                                              <tr>
                                                    <td
                                                    align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;" colspan="2"
                                                    >
                                                          <div
                                                          style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
                                                          ><strong>Payment method:</strong> ${
                                                            config.testimonials[order.payment_type]
                                                          }</div>
                                                    </td>
                                              </tr>
                                          <tr>
                                          <td
                                             align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;" colspan="2"
                                             >
                                             <div
                                                style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
                                                ><strong>Price:</strong> ${order.price}$</div>
                                          </td>
                                       </tr>
                                       
                                    ${displayDiscount(order)}
                                   ${displayCoupon(order)}
                                          <tr>
                                             <td
                                                align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;" colspan="2"
                                                >
                                                <div
                                                   style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
                                                   ><strong>Total:</strong> ${
                                                     order.order_total
                                                   }$</div>
                                             </td>
                                          </tr>
                                          <tr>
                                          <td colspan="2">
                                          <hr style="
                                          margin: 15px 0;
                                          border: 0px;
                                          border-top: solid 1px lightgrey;
                                          height: 0px !important;
                                      "/>
                                          </td></tr>
                                          <tr>
                                          <td colspan="2" style="
                                          padding: 0px 25px;
                                      ">
                                          <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              border="0"
                                              style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none;"
                                              >
                                              <tr>
                                                 <td>
                                                 <div
                                                 style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;"
                                                 >
                                                 <p><strong>SHIPPING ADDRESS</strong></p>
                                                 <p>  ${
                                                   order.shippingAddress_firstName
                                                     ? order.shippingAddress_firstName
                                                     : order.billingAddress_firstName
                                                 } 
                                                 ${
                                                   order.shippingAddress_lastName
                                                     ? order.shippingAddress_lastName
                                                     : order.billingAddress_lastName
                                                 }, <br/>
                                                 ${
                                                   order.shippingAddress_email
                                                     ? order.shippingAddress_email
                                                     : order.billingAddress_email
                                                 }<br/> 
                                                 ${
                                                   order.shippingAddress_phone
                                                     ? order.shippingAddress_phone
                                                     : order.billingAddress_phone
                                                 }, <br/>
                                                 ${
                                                   order.shippingAddress_address
                                                     ? order.shippingAddress_address
                                                     : order.billingAddress_address
                                                 } 
                                                 ${
                                                   order.shippingAddress_address2
                                                     ? order.shippingAddress_address2
                                                     : order.billingAddress_address2 !== ''
                                                     ? order.billingAddress_address2
                                                     : ''
                                                 },
                                                 ${
                                                   order.shippingAddress_country
                                                     ? order.shippingAddress_country
                                                     : order.billingAddress_country
                                                 },<br/>
                                                 ${
                                                   order.shippingAddress_zip
                                                     ? order.shippingAddress_zip
                                                     : order.billingAddress_zip
                                                 }
                                                 </p>
                                                
                                                </div>
                                                 </td>
                                                 <td>
                                                 <div
                                                 style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;"
                                                 >
                                                 <p><strong>BILLING ADDRESS</strong></p>
                                                 <p>   ${order.billingAddress_firstName} ${
    order.billingAddress_lastName
  },<br/>
                                                 ${order.billingAddress_email}<br/> ${
    order.billingAddress_phone
  }, <br/>
                                                 ${order.billingAddress_address} ${
    order.billingAddress_address2
  }, ${order.billingAddress_country} <br/>${order.billingAddress_zip}</p>
                                                
                                                </div>
                                                 </td>
                                              </tr>
                                           </table>
 
                                         
                                          </td>
                                          </tr>
                                       </table>
                                    </div>
                                    <!--[if mso | IE]>
                                 </td>
                              </tr>
                           </table>
                           <![endif]-->
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <!--[if mso | IE]>
         </td>
      </tr>
   </table>
   <![endif]-->
 </div>
   `;
};

const tableBodyTrackingNumber = order => {
  return `
  <div
  style=""
  >
  <!--[if mso | IE]>
  <table
     align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
     >
     <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
           <![endif]-->
           <div  style="margin:0px auto;max-width:600px;">
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
                 >
                 <tbody>
                    <tr>
                       <td
                          style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"
                          >
                          <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                             <tr>
                                <td
                                   class="" style="vertical-align:top;width:600px;"
                                   >
                                   <![endif]-->
                                   <div
                                      class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                                      >
                                     
                                      <table
                                         border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
                                         >
                                       
                                       
                                      <tr>
                                      <td
                                         align="left" style="font-size:0px;padding:5px 25px;word-break:break-word;"
                                         >
                                         <div
                                            style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;"
                                            >
                                            You can track you Fluffy order following this link: <a href="${
                                              order.tracking_link
                                            }">${order.tracking_link}</a>
                                            <p>
                                            Tracking number: ${order.tracking_number}
                                            </p>
                                            </div>
                                      </td>
                                   </tr>
                                         <tr>
                                         <td colspan="2">
                                         <hr style="
                                         margin: 15px 0;
                                         border: 0px;
                                         border-top: solid 1px lightgrey;
                                         height: 0px !important;
                                     "/>
                                         </td></tr>
                                         <tr>
                                         <td colspan="2" style="
                                         padding: 0px 25px;
                                     ">
                                         <table
                                             cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             border="0"
                                             style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none;"
                                             >
                                             <tr>
                                                <td>
                                                <div
                                                style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;"
                                                >
                                                <p><strong>SHIPPING ADDRESS</strong></p>
                                                <p>  ${
                                                  order.shippingAddress_firstName
                                                    ? order.shippingAddress_firstName
                                                    : order.billingAddress_firstName
                                                } 
                                                ${
                                                  order.shippingAddress_lastName
                                                    ? order.shippingAddress_lastName
                                                    : order.billingAddress_lastName
                                                }, <br/>
                                                ${
                                                  order.shippingAddress_email
                                                    ? order.shippingAddress_email
                                                    : order.billingAddress_email
                                                }<br/> 
                                                ${
                                                  order.shippingAddress_phone
                                                    ? order.shippingAddress_phone
                                                    : order.billingAddress_phone
                                                }, <br/>
                                                ${
                                                  order.shippingAddress_address
                                                    ? order.shippingAddress_address
                                                    : order.billingAddress_address
                                                } 
                                                ${
                                                  order.shippingAddress_address2
                                                    ? order.shippingAddress_address2
                                                    : order.billingAddress_address2 !== ''
                                                    ? order.billingAddress_address2
                                                    : ''
                                                },
                                                ${
                                                  order.shippingAddress_country
                                                    ? order.shippingAddress_country
                                                    : order.billingAddress_country
                                                },<br/>
                                                ${
                                                  order.shippingAddress_zip
                                                    ? order.shippingAddress_zip
                                                    : order.billingAddress_zip
                                                }
                                                </p>
                                               
                                               </div>
                                                </td>
                                                <td>
                                                <div
                                                style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;"
                                                >
                                                <p><strong>BILLING ADDRESS</strong></p>
                                                <p>   ${order.billingAddress_firstName} ${
    order.billingAddress_lastName
  },<br/>
                                                ${order.billingAddress_email}<br/> ${
    order.billingAddress_phone
  }, <br/>
                                                ${order.billingAddress_address} ${
    order.billingAddress_address2
  }, ${order.billingAddress_country} <br/>${order.billingAddress_zip}</p>
                                               
                                               </div>
                                                </td>
                                             </tr>
                                          </table>

                                        
                                         </td>
                                         </tr>
                                      </table>
                                   </div>
                                   <!--[if mso | IE]>
                                </td>
                             </tr>
                          </table>
                          <![endif]-->
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
           <!--[if mso | IE]>
        </td>
     </tr>
  </table>
  <![endif]-->
</div>
  `;
};

const checkStatus = ({ _id }) => {
  return `
 
        <div
           style="" class="footer"
        >
        <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
        >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
      
        
        <div  style="margin:0px auto;max-width:600px;">
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
          >
            <tbody>
              <tr>
                <td
                   style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"
                >
                  <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  
          <tr>
        
              <td
                 class="" style="vertical-align:top;width:600px;"
              >
            <![endif]-->
              
        <div
           class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
        >
          
        <table
           border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
        >
          
              <tr>
                <td
                   align="left" style="font-size:0px;padding: 15px;word-break:break-word;background: #f18381;text-align: center;color: #fff;line-height: 1.8;"
                >
                  
        <div
           style="font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:14px;/* line-height:1; */text-align:left;color: #ffffff;text-align: center;"
        >

        <a style="color: #ffffff font-weight: bold;" href="https://fluffy.co.il/check-order-status/${_id}">Press to check your order status</a>  
        <br>Order number: ${_id}
        </div>
      
                </td>
              </tr>
            
        </table>
      
        </div>
      
            <!--[if mso | IE]>
              </td>
            
          </tr>
        
                    </table>
                  <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          
        </div>
      
        
        <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
      
      
        </div>
    
    `;
};

const wrapperUpperBody = `
  <!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0">
<tr>
   <td class="" style="vertical-align:top;width:600px;">
      <![endif]-->
      <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
         <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
            <tr>
               <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                  <p style="border-top:solid 1px lightgrey;font-size:1;margin:0px auto;width:100%;"></p>
                  <!--[if mso | IE]>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px lightgrey;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px">
                     <tr>
                        <td style="height:0;line-height:0;">
                           &nbsp;
                        </td>
                     </tr>
                  </table>
                  <![endif]-->
               </td>
            </tr>
         </table>
      </div>
      <!--[if mso | IE]>
   </td>
   <td class="" style="vertical-align:top;width:30px;">
      <![endif]-->
      <div class="mj-column-per-5 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
         <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
            <!-- Your first column -->
         </table>
      </div>
      <!--[if mso | IE]>
   </td>
   <td class="" style="vertical-align:top;width:540px;">
      <![endif]-->
      <div class="mj-column-per-90 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
<tr>
   <td align="left" style="font-size:0px;padding-top:10px;padding-bottom:10px;word-break:break-word;">
      <div style="font-family:Nunito, Helvetica, Arial, sans-serif;font-size:14px;line-height:25px;text-align:left;color:#000000;">
      `;

const wrapperDownBody = `
</div>
</td>
</tr>
</table>
</div>
<!--[if mso | IE]>
</td>
<td class="" style="vertical-align:top;width:30px;">
   <![endif]-->
   <div class="mj-column-per-5 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
         <!-- Your first column -->
      </table>
   </div>
   <!--[if mso | IE]>
</td>
<td class="" style="vertical-align:top;width:600px;">
   <![endif]-->
   <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
         <tr>
            <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
               <p style="border-top:solid 1px lightgrey;font-size:1;margin:0px auto;width:100%;"></p>
               <!--[if mso | IE]>
               <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px lightgrey;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px">
                  <tr>
                     <td style="height:0;line-height:0;">
                        &nbsp;
                     </td>
                  </tr>
               </table>
               <![endif]-->
            </td>
         </tr>
      </table>
   </div>
   <!--[if mso | IE]>
`;

const GET_IMAGE_STYLE = style => {
  switch (style) {
    case 'Colorfull':
      return 'https://i.ibb.co/t2vg9d6/colorful-crop.jpg';

    case 'Anime':
      return 'https://i.ibb.co/kgd9pwc/anime-crop.jpg';

    case 'Meme':
      return 'https://i.ibb.co/s2QpJ1v/meme-crop.jpg';
    case 'Storyline':
    default:
      return 'https://i.ibb.co/K2Bf5nw/storytale-crop.jpg';
  }
};

module.exports = { getBody };
