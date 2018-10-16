const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    <div style="width:100%; height:100%; background-color: #666; padding: 10px;">
      <p style="color: rgba(255, 255, 255, 0.9);">${req.body.name},</p>
      <p style="color: rgba(255, 255, 255, 0.9);">I have received your message and will get back to you ASAP.
      Thank you for your interest!</p>
      <hr>
      <p style="color: rgba(255, 255, 255, 0.9); padding:25px;">${req.body.message}
      <br>${req.body.email}</p>
    </div>`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.sendStatus(500);
    }
    return res.end();
  });
});

const port = process.env.PORT || 8080;

app.listen(port);
