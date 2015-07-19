var es = require('elasticsearch');
var _  = require('lodash');

/**
 * # Search
 */

/**
 * Search the model based off of a elasticsearch Query string
 * @param  {String}   query   based of elasitcsarch query string
 * @param  {Object}   options Options for the es call
 * @param  {Function} callback  Optional callback
 * @return {Promise}       Returns a promise unless there is a callback
 */
exports.searchQuery = function (query, opt, cb) {
  var params = _.merge({
    index: this.index,
    type: this.type,
    q: query
  }, opt);

  return this
    .connection
    .search(params, cb);
}

/**
 * Search the model based of a elasticsearch body object
 * @param  {Object}   body object with more search options
 * @param  {Object}   options Options for the es call
 * @param  {Function} callback  Optional callback
 * @return {Promise}       Returns a promise unless there is a callback
 */
exports.searchBody = function (body, opt, cb) {
  var params = _.merge({
    index: this.index,
    type: this.type,
    body: body
  }, opt);

  return this
    .connection
    .search(params, cb);
}

/**
 * Get document by document Id
 * @param  {String|Number|ElasitcsearchId}   id  document id
 * @param  {Object}   options Options for the es call
 * @param  {Function} callback  Optional callback
 * @return {Promise}       Returns a promise unless there is a callback
 */
exports.get = function (id, opt, cb) {
  if (!opt) opt = {};

  return this
    .connection
    .get(_.merge(
      {
        index: this.index,
        type: this.type,
        id: id
      }, opt),
      cb
    );
}
