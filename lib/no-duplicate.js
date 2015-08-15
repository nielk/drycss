var css = require('css');
var _ = require('lodash');
var logSymbols = require('log-symbols');
var chalk = require('chalk');

var indexedRules;
var position;

function init(cssString, options) {
  var options = options || {};
  var stylesheet = css.parse(cssString).stylesheet;
  indexedRules = [];
  position = 0;

  var result = stylesheet.rules.map(checkRule).join().indexOf('false');

  if (!~result) {
    successMessage('Congrats ! no duplicated declaration block found');
    return true;
  }
}

function checkRule(rule) {

  if (rule.type === 'media') {
    return checkRuleForMediaquerie(rule);
  };

  if (rule.type !== 'rule') {
    return true;
  }

  var rawRule = rule;
  position = rule.position.start;
  rule = trimRule(rule.declarations);
  isDuplicated = _.find(indexedRules, rule);

  if (!isDuplicated) {
    indexedRules.push(trimRule(rawRule.declarations, true));
    return true;
  } else {
    errorMessage(position.line, isDuplicated[isDuplicated.length - 1].line, rawRule);
    return false;
  }
}

function checkRuleForMediaquerie(rule) {
  var savedIndexedRules = indexedRules;
  indexedRules = [];

  var result = rule.rules.map(checkRule).join().indexOf('false');
  indexedRules = savedIndexedRules;

  return !~result;
}

function errorMessage(currentPosition, rulePosition, rawRule) {
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

  console.log(msg);
}

function successMessage(msg) {
  console.log(chalk.white.bgGreen.bold(msg));
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

function trimRule(declarations, withPosition) {
  var filteredRule = declarations.map(function (declaration) {
    return {
      property: declaration.property,
      value: declaration.value
    };
  });

  if (withPosition) {
    filteredRule.push(position);
  }

  return filteredRule;
};

module.exports = init;
