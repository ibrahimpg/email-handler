const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/message', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'mail.ibrahimpg.com',
    port: 587,
    secure: false,
    auth: {
      user: 'test@ibrahimpg.com',
      pass: 'SpookyBoi',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: '"Ibrahim P.G." <test@ibrahimpg.com>',
    to: `${req.body.email}, ipaboughalioum@alaska.edu`,
    subject: 'Node Contact Request',
    html: `
    <div style="width:100%; height:100%; background-color: #666; color: rgba(255, 255, 255, 0.9); padding: 10px;">
      <h1>${req.body.name}</h1>
      <p>I have received your message and will get back to you ASAP. Thank you for your interest!</p>
      <hr>
      <p style="padding-left:25px;">${req.body.message}</p>
    </div>`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.sendStatus(500);
    }
    return res.json({ message: 'Message sent!' });
  });
});

const port = process.env.PORT || 8080;

app.listen(port);
