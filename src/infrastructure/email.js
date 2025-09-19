const nodemailer = require("nodemailer");

async function sendRecoveryEmail(to, code) {
  // Configure your SMTP transport here
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: "info@demomailtrap.co",
    to,
    subject: "Password Recovery Code",
    text: `Your password recovery code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendRecoveryEmail };
