var Promise = require('bluebird');
var _       = require('lodash');

/**
 * # Query
 */

/**
 * findAll documents with specific query
 * @param  {Object}   query object
 * @param  {Object}   opt Optional options object
 * @param  {Function} cb  Optional callback
 * @return {Promise}       If there is no callback it will return a promise
 */
exports.findAll = function (query, opt, cb) {
  var self = this;
  return new Promise(function(resolve, reject) {
    if (!opt) opt = {};
    var all = [];

    self
      .connection
      .search(_.merge(
        {
          index: this.index,
          type: this.type,
          body: query,
          scroll: '30s'
        }, opt),
        function getMoreUntilDone(error, response) {
          if (error) {
            if (cb)
              cb(error, undefined);
            else
              reject(error);
          }else {
            response.hits.hits.forEach(function (hit) {
              all.push(hit);
            });

            if (response.hits.total !== all.length) {
              self
                .connection
                .scroll({
                  scrollId: response._scroll_id,
                  scroll: '30s'
                }, getMoreUntilDone);
            }else {
              response.hits.hits = all;
              if (cb)
                cb(error, response);
              else
                resolve(response);
            }
          }
        }
      )
  });
}
