const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

function createTemplate(data, fileName) {
  const templateFile = fs.readFileSync(
    //`../templates/emailtemplates/${fileName}.handlebars`,
    path.join(__dirname, '..', 'templates', 'email', `${fileName}.handlebars`),
    'utf-8'
  );

  /* const templateFile = `<h2>Application Status Update</h2>

  <p>Dear {{applicant.name}},</p>
  
  <p>We hope this email finds you well. We wanted to inform you that there has
    been a change in the status of your application for
    {{jobTitle}}
    at
    {{hr.company}}.</p>
  
  <p>Please note that this email is an automated notification. You can log in to
    your TalenTrack account to view more details about your application status and
    any updates made by the hiring team.</p>
  
  <p>If you have any questions or need further assistance, please feel free to
    contact our support team.</p>
  
  <p>Thank you for your interest in joining our team.</p>
  
  <p>Best regards,</p>
  <p>{{hr.name}}</p>
  <p>{{hr.company}}</p>`; */

  const template = Handlebars.compile(templateFile);
  const htmlFile = template(data);

  return htmlFile;
}

module.exports = createTemplate;
