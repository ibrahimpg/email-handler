const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: 'my host',
  port: 465,
  secure: true,
  auth: {
    user: 'test@ibrahimpg.com',
    pass: process.env.EMAIL_PW,
  },
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 'https://ibrahimpg.com'
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST');
    res.status(200).json({});
  }
  next();
});

app.post('/message', (req, res) => {
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

app.use((req, res, next) => {
  const error = new Error('Route not available.');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

const port = process.env.PORT || 8080;

app.listen(port);
