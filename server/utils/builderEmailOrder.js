const CONSTANT = require('./contsText');
const { Header } = require('./template-email/header');
const { Footer } = require('./template-email/footer');
const { Logotype } = require('./template-email/logotype');
const { Title } = require('./template-email/title');
const { SubTitle } = require('./template-email/subTitle');
const {getBody} = require('./template-email/body');

const getColorSubTitle = type => {
  switch (type) {
    case CONSTANT.STATUS_NEW:
    case CONSTANT.STATUS_NOT_PAID:
      return CONSTANT.COLOR_SUBTITLE_NEW;
    case CONSTANT.STATUS_IN_DELIVERY:
      return CONSTANT.COLOR_SUBTITLE_IN_DELIVERY;
    case CONSTANT.STATUS_READY_TO_DISPATCH:
      return CONSTANT.COLOR_SUBTITLE_READY_TO_DISPATCH;
    case CONSTANT.STATUS_NOT_CONFIRMED:
      return CONSTANT.COLOR_SUBTITLE_NOT_CONFIRMED;
    case CONSTANT.STATUS_IN_PROCESS:
      return CONSTANT.COLOR_SUBTITLE_IN_PROCESS;
    case CONSTANT.STATUS_COMPLETE:
    default:
      return CONSTANT.COLOR_SUBTITLE_COMPLETE;
  }
};

const getSubjectEmail = status => {
  switch (status) {
    case CONSTANT.STATUS_NEW:
    case CONSTANT.STATUS_NOT_PAID:
      return CONSTANT.SUBJECT_NEW;
    case CONSTANT.STATUS_IN_PROCESS:
      return CONSTANT.SUBJECT_IN_PROCESS;
    case CONSTANT.STATUS_READY_TO_DISPATCH:
      return CONSTANT.SUBJECT_READY_TO_DISPATCH;
    case CONSTANT.STATUS_COMPLETE:
      return CONSTANT.SUBJECT_COMPLETE;
    case CONSTANT.STATUS_IN_DELIVERY:
      return CONSTANT.SUBJECT_IN_DELIVERY;
    case CONSTANT.STATUS_NOT_CONFIRMED:
    default:
      return CONSTANT.SUBJECT_NOT_CONFIRMED;
  }
};

const SloganText = (status) => {
  switch (status) { 
    case CONSTANT.STATUS_NEW:
    case CONSTANT.STATUS_NOT_PAID:
      return CONSTANT.TEXT_DESCRIPTION_NEW;
    case CONSTANT.STATUS_IN_DELIVERY:
      return CONSTANT.TEXT_DESCRIPTION_IN_DELIVERY;
    case CONSTANT.STATUS_READY_TO_DISPATCH:
      return CONSTANT.TEXT_DESCRIPTION_READY_TO_DISPATCH;
    case CONSTANT.STATUS_NOT_CONFIRMED:
      return CONSTANT.TEXT_DESCRIPTION_NOT_CONFIRMED;
    case CONSTANT.STATUS_IN_PROCESS:
      return CONSTANT.TEXT_DESCRIPTION_IN_PROCESS;
    case CONSTANT.STATUS_COMPLETE:
    default:
      return CONSTANT.TEXT_DESCRIPTION_COMPLETE;
  }
};


const builderHtml = order => {



  return `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
${ Header }
<body { style=} "background-color:#d6dde5;" id="body">
<!--[if mso { | } IE]>
<table { align} ="center" border="0" cellpadding="0" cellspacing="0" class="wrapper0234-outlook" style="width:600px;" width="600">
  <tr>{ 
    <td } style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
  <div class="wrapper0234" style="background-color: #ffffff; background-image: url(https://i.ibb.co/cY72NfP/fluffy-logo-1.png); background-size: 100%; background-repeat: no-repeat; background-position: center center; margin: 0px auto; max-width: 600px;">
    <a href="http://fluffy.co.il/" target="_blank">${Logotype}</a>
  <div style="">
<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600">
  <tr>
  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]-->


<div  style="margin:0px auto;max-width:600px;">

<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
  <tbody>
    <tr>
      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:27px;padding-top:0;text-align:center;">
  <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td class="" style="vertical-align:top;width:600px;">
        <![endif]-->

<div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> 
    <tr>
      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-right:25px;padding-bottom:10px;padding-left:25px;word-break:break-word;">
        <div style="font-family:Nunito, Helvetica, Arial, sans-serif;font-size:50px;font-weight:500;line-height:1;text-align:center;text-transform:uppercase;color:#000000;">            
          ${Title(order.status)}
        </div>
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:25px;padding-bottom:0px;padding-left:25px;word-break:break-word;">
        <div style="font-family:Nunito, Helvetica, Arial, sans-serif;font-size:18px;font-weight:300;line-height:1;text-align:center;text-transform:uppercase;color:#000000;">
          ${SubTitle(order.status)}
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

<table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600">
<tr>
<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]-->


<div  style="margin:0px auto;max-width:600px;">

<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
<tbody>
<tr>
<td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:10px;padding-top:10px;text-align:center;">
  <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td class="" style="vertical-align:top;width:600px;">
<![endif]-->

<div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
    <tr>
      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        <div style="font-family:Nunito, Helvetica, Arial, sans-serif;font-size:18px;line-height:1.5;text-align:center;color:#53B0AD;color:${getColorSubTitle(
          order.status
        )};">
          ${SloganText(order.status)}
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
<div style="">

<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600">
  <tr>
    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]-->

<div style="background:;background-color:;margin:0px auto;max-width:600px;">

<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" role="presentation" style="background-color:;width:100%; margin: 0 auto;">
    <tbody>
        <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
          ${getBody(order)}
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
${Footer}
</div>
<!--[if mso | IE]>
</td>
  </tr>
    </table>
<![endif]-->
</body>
</html>
`;
};


const builderGiftHtml = (giftOrder) => {
  return `<!DOCTYPE html>
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <title> </title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if mso]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix {
            width: 100% !important;
          }
        </style>
      <![endif]-->
  
      <!--[if !mso]><!-->
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
        rel="stylesheet"
        type="text/css"
      />
      <style type="text/css">
        @import url(
          https://fonts.googleapis.com/css?family=Open+Sans:300,
          400,
          500,
          700
        );
        @import url(
          https://fonts.googleapis.com/css?family=Ubuntu:300,
          400,
          500,
          700
        );
      </style>
      <!--<![endif]-->
  
      <style type="text/css">
        @media only screen and (min-width: 480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
          .mj-column-per-10 {
            width: 10% !important;
            max-width: 10%;
          }
          .mj-column-per-70 {
            width: 70% !important;
            max-width: 70%;
          }
          .mj-column-per-5 {
            width: 5% !important;
            max-width: 5%;
          }
          .mj-column-per-90 {
            width: 90% !important;
            max-width: 90%;
          }
        }
      </style>
  
      <style type="text/css">
        @media only screen and (max-width: 480px) {
          table.full-width-mobile {
            width: 100% !important;
          }
          td.full-width-mobile {
            width: auto !important;
          }
        }
      </style>
    </head>
    <body style="background-color:#f3f3f3;">
      <div style="background-color:#f3f3f3;">
        <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
  
        <div
          style="background:;background-color:;margin:0px auto;max-width:600px;"
        >
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="background:;background-color:;width:100%;"
          >
            <tbody>
              <tr>
                <td
                  style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20;text-align:center;"
                >
                  <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-100 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    >
                      <tr>
                        <td
                          align="center"
                          style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="border-collapse:collapse;border-spacing:0px;"
                          >
                            <tbody>
                              <tr>
                                <td style="width:182px;">
                                  <a href="https://fluffy.co.il" target="_blank">
                                    <img
                                      alt="Amario logo"
                                      height="auto"
                                      src="https://ci5.googleusercontent.com/proxy/-Gy7UVyB9XIIG_-Zm3VXgh2OoYITWdSNH2JcAiLuskSoZZYHjlpvhhZgRKVk1ykSU1XOsiyJSRqRUZtJHZRvfj0=s0-d-e1-ft#https://i.ibb.co/1mysGCc/logotype-718a1b2a.png"
                                      style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                      width="182"
                                    />
                                  </a>
                                </td>
                              </tr>
                            </tbody>
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
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
  
        <div
          style="    background: #ffffff;
      background-color: #ffffff;
      margin: 0px auto;
      max-width: 500px;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: rgb(202, 202, 202) 0px 1px 3px !important;"
        >
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="background:#ffffff;background-color:#ffffff;width:100%;"
          >
            <tbody>
              <tr>
                <td
                  style="direction:ltr;font-size:0px;padding:0px;text-align:center;"
                >
                  <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-100 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    >
                      <tr>
                        <td
                          align="center"
                          style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="border-collapse:collapse;border-spacing:0px;"
                          >
                            <tbody>
                              <tr>
                                <td style="width:100%">
                                  <img
                                    height="auto"
                                    src="https://i.ibb.co/F6pdPfV/mazel-tov.png"
                                    style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                  />
                                </td>
                              </tr>
                            </tbody>
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
  
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="background:#ffffff;background-color:#ffffff;width:100%;"
          >
            <tbody>
              <tr>
                <td
                  style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-left:0;padding-right:0;padding-top:20;text-align:center;"
                >
                  <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:60px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-10 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    ></table>
                  </div>
  
                  <!--[if mso | IE]>
            </td>
          
            <td
               class="" style="vertical-align:top;width:420px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-70 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    >
                      <tr>
                        <td
                          align="left"
                          style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:20px;padding-bottom:0px;padding-left:20px;word-break:break-word;"
                        >
                          <div
                            style="font-family:Open Sans, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
                          >
                            <p>
                              <span style="font-weight: bold; font-size: 16px;">
                                ${giftOrder.message}
                              </span>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
  
                  <!--[if mso | IE]>
            </td>
          
            <td
               class="" style="vertical-align:top;width:60px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-10 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    ></table>
                  </div>
  
                  <!--[if mso | IE]>
            </td>
          
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-100 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    >
                      <tr>
                        <td
                          style="font-size:0px;padding:10px 0;word-break:break-word;"
                        >
                          <p
                            style="border-top:solid 1px #cccccc;font-size:1;margin:0px auto;width:100%;"
                          ></p>
  
                          <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #cccccc;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
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
          
            <td
               class="" style="vertical-align:top;width:30px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-5 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    ></table>
                  </div>
  
                  <!--[if mso | IE]>
            </td>
          
            <td
               class="" style="vertical-align:top;width:540px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-90 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    >
                      <tr>
                        <td
                          align="left"
                          style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:10px;padding-bottom:0px;padding-left:10px;word-break:break-word;"
                        >
                          <div
                            style="font-family:Open Sans, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
                          >
                            <p>
                              <span
                                ><span style="font-weight: normal;"
                                  ><span style="font-size: 40px;"
                                    >${giftOrder.amount} ils</span
                                  ></span
                                >
                                <p>
                                  Fluffy Gift Card
                                </p>
                              </span>
                            </p>
                            <div style="width: 100%; text-align: center; font-size: 20px;">
                                <a href="https://fluffy.co.il/" style=" color: #000;">Go to order</a>
                                </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
  
                  <!--[if mso | IE]>
            </td>
          
            <td
               class="" style="vertical-align:top;width:30px;"
            >
          <![endif]-->
  
                  <div
                    class="mj-column-per-5 outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align:top;"
                      width="100%"
                    ></table>
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
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:100%;" width="100%"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
  
        <div
          style="
      background: #444444;
      background-color: #444444;
      margin: 0px auto;
      max-width: 100%;
      border-radius: 0;
      overflow: hidden;
      margin-top: 40px;
      padding: 40px;
  "
        >
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
          >
            <tbody>
              <tr>
                <td
                  style="direction:ltr;font-size:0px;/* padding:20px 0; *//* padding-bottom:20px; *//* padding-top:50px; */text-align:center;display: block;"
                >
                  <div
                    class="m_8712775157419286789mj-column-per-100"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background-color:#444444;vertical-align:top"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style="font-size:0px;padding: 0;word-break:break-word;"
                          >
                            <div
                              style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
                            >
                              <span
                                style="font-size: 16px;border:2px solid;color: #fff;padding:0px;text-align:center;max-width:300px;padding-top: 10px;padding-bottom: 10px;margin:0 auto;padding: 20px 20px;"
                                width="300px"
                                color="#ffffff"
                              >
                                Claim code: ${giftOrder.coupon}</span
                              >
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
    </body>
  </html>
  

  `
}


module.exports = {
  builderHtml,
  builderGiftHtml,
  getSubjectEmail,
};
