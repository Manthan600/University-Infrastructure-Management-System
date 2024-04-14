const nodemailer = require("nodemailer");

const sendMail = async (req, res, sender, to, subject, message) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // auth: {
    //   // user: 'ellie.greenfelder@ethereal.email',
    //   user: 'ellie.greenfelder@ethereal.email',
    //   pass: '9XWw7se4hj23Da3gUX'
   

    host: "smtp.gmail.com",
    port: 587,
    auth: {
      // user: 'ellie.greenfelder@ethereal.email',
      user: 'manthans.kshetrapal@gmail.com',
      pass: 'kqpcbomemnudfeed'
    }
  });

  let info = await transporter.sendMail({
    from: sender, // sender address
    to: to.join(", "), // comma-separated list of recipients
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<b>${message}</b>`, // html body
  });

  console.log("Message sent from:", sender);
  console.log("Message sent to:", to.join(", "));
  console.log("Subject:", subject);
  console.log("Message sent: %s", info.messageId);
  return info;
};

module.exports = sendMail;
