

<!-- Start lib/index.js -->

# Rebound API

## connect(host, Options)

Connects to a specific node
### Example:

		Rebound.connect('localhost:9200');
		// or
		var optoons = {
			defaults: {
				index: 'Company',
				type: 'ExampleType'
			}
			// any other elasticsearch options you want go here
		};
		Rebound.connect('localhost:9200', options);

### Params:

* **string** *host* for elasticsearch
* **Object** *Options* for the elasticsearch clien

## modelIndex(index, type, schema, opt)

Create a Rebound Model with a cerntain index, type, and schema

### Examples:

   	Rebound.modelIndex('Company', 'User', Schema);

### Params:

* **String** *index* elasticsearch index
* **String** *type* elasticsearch type
* **Schema** *schema* The Rebound Schema that maps to the specified index and type
* **Object** *opt* Options for the Rebound Model

### Return:

* **Model** The Rebound Model is returned

## modelType(type, schema, opt)

Create a Rebound Model with the default index and specifeied type

### Examples:

   	Rebound.modelType('User', Schema);

### Params:

* **String** *type* elasticsearch type
* **Schema** *schema* The Rebound Schema that maps to the specified index and type
* **Object** *opt* Options for the Rebound Model

### Return:

* **Model** The Rebound Model is returned

## getModel(index, type)

Gets specified model

### Examples:

   	Rebound.getModel('Comapny', 'User');

### Params:

* **String** *index* Index for the model you want
* **String** *type* Type for the Model you want

### Return:

* **Model** The Rebound Model is returned

## ping(timeout, callback)

Ping the elasticsearch node

### Params:

* **Number** *timeout* 
* **Function** *callback* 

### Return:

* **Promise** Optional promise

<!-- End lib/index.js -->

<!-- Start lib/model.js -->

# Rebound Model

## create(doc, opt, cb)

Creates an elasticsearch document

### Params:

* **Object** *doc* the body of the elasticsearch document
* **Object** *opt* Optional options object
* **Function** *cb* Optional callback

### Return:

* **Promise** If there is no callback it will return a promise

## delete(id, opt, cb)

Deletes a document based of the supllied id

### Params:

* **String|Number|ElasicsearchId** *id* document id
* **Object** *opt* Optional options object
* **Function** *cb* Optional callback

### Return:

* **Promise** If there is no callback it will return a promise

## deleteByQuery(body, opt, cb)

Delete document by a query

### Params:

* **Object** *body* Query body
* **Object** *opt* Optional options object
* **Function** *cb* Optional callback

### Return:

* **Promise** If there is no callback it will return a promise

## update(id, doc, opt, cb)

Update document by id

### Params:

* **String|Number|ElasticsearchId** *id* document id
* **Object** *doc* body
* **Object** *opt* Optional options object
* **Function** *cb* Optional callback

### Return:

* **Promise** If there is no callback it will return a promise

## prototype

## Search

*For search API checkout the Rebound Search Object*

<!-- End lib/model.js -->

<!-- Start lib/schema.js -->

## mapProperties()

function checkTypes(doc) {
  // TODO need to figure out proper way to do this
  var defs = mapProperties(this.defs);
  _.forIn(doc, function (value, key) {
      var temp = defs.properties[key].type;
  });
}

<!-- End lib/schema.js -->

<!-- Start lib/search.js -->

## search(query, options, callback)

search

### Params:

* **Object** *query* This can either be a query or a body
* **Object** *options* Options for the es call
* **Function** *callback* Optional callback

### Return:

* **Promise** Returns a promise unless there is a callback

<!-- End lib/search.js -->
