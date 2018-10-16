const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/message', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'mail.ibrahimpg.com',
    port: 26,
    secure: false,
    auth: {
      user: 'ibrahim@ibrahimpg.com',
      pass: process.env.EMAIL_PW,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: '"Ibrahim P.G." <ibrahim@ibrahimpg.com>',
    to: `${req.body.email}, ibrahim@ibrahimpg.com`,
    subject: 'Automatic reply from Ibrahim P.G.',
    text: `${req.body.name}, I have received your message and will get back to you as soon as possible. Thank you for your interest!
      ${req.body.message}
      ${req.body.email}`,
  };
  transporter.sendMail(mailOptions)
    .then(res.status(200))
    .catch(res.status(500));
});

const port = process.env.PORT || 8080;

app.listen(port);
