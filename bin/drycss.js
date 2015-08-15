var fs = require('fs');
var cli = require('commander');
var noDuplicate = require('./lib/no-duplicate.js');

var cssString = '';

cli
  .version('0.0.1')
  .option('-s, --source [source]', 'css source file')
  .option('-S, --string [string]', 'css string')
  .parse(process.argv);

readCSSFile(cli.source);

function readCSSFile(path) {

  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    noDuplicate(data);
  });
}