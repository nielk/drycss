////////////////////////////////////////
// Requirements                       //
////////////////////////////////////////

var css = require('css');
var _ = require('lodash');
var format = require('./format');

////////////////////////////////////////
// Helpers                            //
////////////////////////////////////////

var indexedRules;
var position;

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
    format.error(position.line, isDuplicated[isDuplicated.length - 1].line, rawRule);
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

////////////////////////////////////////
// Public API                         //
////////////////////////////////////////

function parse(cssString, options) {
  var options = options || {};
  var stylesheet = css.parse(cssString).stylesheet;
  indexedRules = [];
  position = 0;

  var result = stylesheet.rules.map(checkRule).join().indexOf('false');

  if (!~result) {
    format.success('Congrats ! no duplicated declaration block found');
    return true;
  }
}

module.exports = parse;
