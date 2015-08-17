////////////////////////////////////////
// Requirements                       //
////////////////////////////////////////

var css = require('css');
var chalk = require('chalk');
var logSymbols = require('log-symbols');

////////////////////////////////////////
// Helpers                            //
////////////////////////////////////////

function print(obj) {
  console.log(obj);
}

function printRule(rules) {
  return ['\n',
    css.stringify({
      type: 'stylesheet',
      stylesheet: {
        rules: [rules]
      }
    }),
    '\n'].join('');
}

////////////////////////////////////////
// Public API                         //
////////////////////////////////////////

function error(currentPosition, rulePosition, rawRule) {

  var msg = [
    chalk.red('-------------------------------------------------------------------'),
    '\n',
    chalk.white.bgRed.bold('L' + currentPosition,
    ': duplicated declaration block found'),
    '\n',
    chalk.cyan(printRule(rawRule)),
    '\n',
    chalk.white.bgRed.bold(' ',
    logSymbols.error,
    ' You should merge declaration block at line ',
    currentPosition,
    ' with declaration block at line ',
    rulePosition),
    '\n',
    chalk.red('-------------------------------------------------------------------'),
    '\n'
  ].join('');

  print(msg);
}

function success(msg) {
  print(chalk.white.bgGreen.bold(msg));
}

module.exports = {
  success: success,
  error: error
};
