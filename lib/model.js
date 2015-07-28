var search = require('./search');
var _      = require('lodash');

var modelOptions = {};

function Model(connection, defaults, opt,schema) {
  this.index = opt.index || defaults.index;
  this.type = opt.type || defaults.type;
  this.connection = connection;
  this.schema = schema;
  // TODO after the props have been set it should check to see if the index exists
  // if the index does not exists then it should create the index mapping
  // based off of the schema mappings
  // There should also be strict mapping vs non strict
}

/**
 * # Rebound Model
 */

/**
 * Creates an elasticsearch document
 *
 * To create the documents with your own id set the *opt.id* property to the id you want for that document.
 * @param  {Object}   doc the body of the elasticsearch document
 * @param  {Object}   opt Optional options objectg
 * @param  {Function} cb  Optional callback
 * @return {Promise}       If there is no callback it will return a promise
 */
Model.prototype.create = function (doc, opt, cb) {
  if (!opt) opt = {};
  var err = this.schema.validateDoc(doc);
  if (err.length > 0) {
    throw new Error(err.join('\n'));
  }else {
    var opt = {
      index: this.index,
      type: this.type,
      body: this.schema.applySchema(doc)
    }
    return this
      .connection
      .create(_.merge(
        {
          index: this.index,
          type: this.type,
          id: opt.id
        }, opt),
      cb
    );
  }
}

/**
 * Deletes a document based of the supllied id
 * @param  {String|Number|ElasicsearchId}   id  document id
 * @param  {Object}   opt Optional options object
 * @param  {Function} cb  Optional callback
 * @return {Promise}       If there is no callback it will return a promise
 */
Model.prototype.delete = function (id, opt, cb) {
  if (!opt) opt = {};

  return this
    .connection
    .delete(_.merge(
      {
        index: this.index,
        type: this.type,
        id: id
      }, opt),
      cb
    );
}

/**
 * Delete document by a query
 * @param  {Object}   body Query body
 * @param  {Object}   opt Optional options object
 * @param  {Function} cb  Optional callback
 * @return {Promise}       If there is no callback it will return a promise
 */
Model.prototype.deleteByQuery = function (body, opt, cb) {
  if (!opt) opt = {};

  return this
    .connection
    .deleteByQuery(_.merge(
      {
        index: this.index,
        type: this.type,
        body: body
      }, opt),
      cb
    );
}

/**
 * Update document by id
 * @param  {String|Number|ElasticsearchId}   id  document id
 * @param  {Object}   doc body
 * @param  {Object}   opt Optional options object
 * @param  {Function} cb  Optional callback
 * @return {Promise}       If there is no callback it will return a promise
 */
Model.prototype.update = function (id, doc, opt, cb) {
  if (!opt) opt = {};

  return this
    .connection
    .update(_.merge(
      {
        index: this.index,
        type: this.type,
        id: id,
        body: {
          doc: doc
        }
      }, opt),
      cb
    );
}

/**
 * ## Search
 *
 * *For search API checkout the Rebound Search Object*
 */
Model.prototype = _.merge(Model.prototype, search);

module.exports = Model;
