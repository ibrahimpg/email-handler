const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
    subject: 'Hey there!',
    html: `
    <div style="width:100%; height:100%; background-color: #666; color: rgba(255, 255, 255, 0.9); padding: 10px;">
      <p>${req.body.name},<br>I have received your message and will get back to you ASAP. Thank you for your interest!</p>
      <hr>
      <p style="padding:25px;">${req.body.message}</p>
    </div>`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.sendStatus(500);
    }
    return res.json({ message: 'Message sent successfully!' });
  });
});

const port = process.env.PORT || 8080;

app.listen(port);
