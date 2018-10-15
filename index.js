const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/message', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'my host',
    port: 465,
    secure: true,
    auth: {
      user: 'test@ibrahimpg.com',
      pass: process.env.EMAIL_PW,
    },
  });
  const mailOptions = {
    from: '"Ibrahim" test@ibrahimpg.com',
    to: req.body.email,
    subject: 'Automatic reply from Ibrahim PG',
    html: `
      <b>${req.body.name}</b><br><br>
      <p>I have received your message and will get back to you as soon as possible. Thank you for your interest!</p>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return;
    }
    res.json({ message: `Message sent: %s', ${info.messageId}` });
  });
});

const port = process.env.PORT || 8080;

app.listen(port);
