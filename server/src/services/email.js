const nodemailer = require('nodemailer');

async function emailService(emailData, template) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: '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', // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"TalenTrack" <freeuc298@gmail.com>', // sender address
    to: emailData.to, // list of receivers
    subject: emailData.subject, // Subject line
    //text: "Hello world?", // plain text body
    html: template, // html body
  });
}

module.exports = emailService;
