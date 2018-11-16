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
    host: 'mail.nanoca.sh',
    port: 26,
    secure: false,
    auth: { user: 'ibrahim@nanoca.sh', pass: process.env.EMAIL_PW },
    tls: { rejectUnauthorized: false },
  });
  transporter.sendMail({
    from: '"Ibrahim P.G." <ibrahim@nanoca.sh>',
    bcc: `${req.body.email}, ibrahim@nanoca.sh`,
    subject: 'Automatic reply from Ibrahim P.G.',
    text: `
    ${req.body.name},
    I have received your message and will get back to you as soon as possible. Thank you for your interest!
    
    "${req.body.message}"
    ${req.body.email}`,
  })
    .then(res.status(200).json({ msg: 'Sent!' }))
    .catch(res.status(500).json({ msg: 'Error!' }));
});

const port = process.env.PORT || 8080;
app.listen(port);
