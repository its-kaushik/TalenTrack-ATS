const nodemailer = require('nodemailer');
const config = require('../config');
const compileTemplate = require('../utils/templateCompiler');
const EmailTemplates = require('../models/emailTemplate.mongo');

class EmailService {
  #transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS,
      },
    });
  }

  #sendMail(options) {
    return new Promise((resolve, reject) => {
      this.#transporter.sendMail(options, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }

  async sendVerificationEmail(userEmail, verificationToken) {
    const templateDocument = await EmailTemplates.findOne({
      name: 'verificationEmail',
    });

    const template = templateDocument.content;

    const data = {
      verificationToken,
    };
    const compiledTemplate = compileTemplate(data, template);

    const emailOptions = {
      from: `"TalenTrack" <${config.GMAIL_USER}>`, // sender
      to: userEmail,
      subject: 'Verify Your Email For TalenTrack',
      html: compiledTemplate,
    };

    return this.#sendMail(emailOptions);
  }
}

module.exports = EmailService;
