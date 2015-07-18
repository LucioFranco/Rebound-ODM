var es = require('elasticsearch');
var _  = require('lodash');

module.exports = function (q, opt, cb) {
  var params = _.merge({
    index: this.index,
    type: this.type
  }, opt);

  if (_.has(q, 'query'))
    params = _.merge(params, { body: q });
  else
    params = _.merge(params, { q: q });

  return this
    .connection
    .search(params, cb);
}
