const nodemailer = require("nodemailer");

const sendMail = async (req, res, sender, to, subject, message) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'marianna.nader53@ethereal.email',
        pass: 'vAGdx7sSWSH5AXf2jc',
    },
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
