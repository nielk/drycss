////////////////////////////////////////
// Requirements                       //
////////////////////////////////////////

var optionator = require('optionator');

////////////////////////////////////////
// Public API                         //
////////////////////////////////////////

// exports 'parse(args)', 'generateHelp()', and 'generateHelpForOption(optionName)'
module.exports = optionator({
  prepend: 'drycss [options] file.css',
  concatRepeatedArrays: true,
  mergeRepeatedObjects: true,
  options: [{
    heading: 'Options'
  }, {
    option: 'help',
    alias: 'h',
    type: 'Boolean',
    description: 'Show help'
  }, {
    option: 'source',
    alias: 's',
    type: 'path::String',
    description: 'File to lint'
  }, {
    option: 'version',
    alias: 'v',
    type: 'Boolean',
    description: 'Outputs the version number'
  }]
});
