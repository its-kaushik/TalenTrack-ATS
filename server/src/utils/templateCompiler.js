const Handlebars = require('handlebars');

function compileTemplate(data, templateFile) {
  const template = Handlebars.compile(templateFile);
  const htmlFile = template(data);

  return htmlFile;
}

module.exports = compileTemplate;
