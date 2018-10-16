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

app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 26,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PW },
  });
  transporter.sendMail({
    from: '"Ibrahim P.G." <ibrahim@ibrahimpg.com>',
    bcc: `${req.body.email}, ${process.env.EMAIL_USER}`,
    subject: `Automatic reply from ${process.env.EMAIL_NAME}`,
    text: `${req.body.name},
    I have received your message and will get back to you as soon as possible.
    Thank you for your interest!
    "${req.body.message}"
    ${req.body.email}`,
  })
    .then(res.status(200).json({ msg: 'Sent!' }))
    .catch(res.status(500).json({ msg: 'Error!' }));
});

const port = process.env.PORT || 8080;
app.listen(port);
