////////////////////////////////////////
// Requirements                       //
////////////////////////////////////////

var fs = require('fs');
var parse = require('./no-duplicate');
var options = require('./options');

////////////////////////////////////////
// Helpers                            //
////////////////////////////////////////

function processFile(path, callback) {

  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    callback(data);
  });
}

////////////////////////////////////////
// Public API                         //
////////////////////////////////////////

var cli = {
  execute: function execute(argv) {

    var curentOptions,
      currentFile;

    try {
      currentOptions = options.parse(argv);
    } catch (error) {
      console.error(error.message);
      return 1;
    }

    if (currentOptions.help || !currentOptions.source.length) {
      console.log(options.generateHelp());
    }

    if (currentOptions.version) {
      console.log('v' + require('../package.json').version);
    }

    currentFile = currentOptions.source;

    try {
      processFile(currentFile, parse);
    } catch (err) {
      return 1;
    }

    return 0;
  }
};

module.exports = cli;
