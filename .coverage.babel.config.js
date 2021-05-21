const defaultBabel = require('@plone/volto/babel');

function applyDefault(api) {
  const voltoBabel = defaultBabel(api);
  voltoBabel.plugins.push('transform-class-properties', 'istanbul');
  return voltoBabel;
}

module.exports = applyDefault;

