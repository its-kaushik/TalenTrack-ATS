const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

function createTemplate(data, fileName) {
  const templateFile = fs.readFileSync(
    //`../templates/emailtemplates/${fileName}.handlebars`,
    path.join(
      __dirname,
      '..',
      'templates',
      'emailtemplates',
      `${fileName}.handlebars`
    ),
    'utf-8'
  );
  const template = Handlebars.compile(templateFile);
  const htmlFile = template(data);

  return htmlFile;
}

module.exports = createTemplate;
