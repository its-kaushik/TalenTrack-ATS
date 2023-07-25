const nodemailer = require('nodemailer');

async function emailService(emailData, template) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: process.env.SG_API_KEY, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"TalenTrack" <freeuc298@gmail.com>', // sender address
    to: emailData.to, // list of receivers
    subject: emailData.subject, // Subject line
    //text: "Hello world?", // plain text body
    html: template, // html body
  });

  //console.log(emailData.to);
}

module.exports = emailService;
