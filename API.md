

<!-- Start lib/index.js -->

# Rebound API

## connect(host, Options)

Connects to a specific node
### Example:

		Rebound.connect('localhost:9200');
		// or
		var options = {
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

## Schema(obj, opts)

Rebound Schema object

### Examples:
	Rebound.Schema({
 		name: String,
   	description: { type: 'string', analyzer: 'not_analyzed' }
    });

### Params:

* **Object** *obj* schema
* **Object** *opts* Optional options

### Return:

* **Schema** New Rebound Schema is returned

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

# Model

## create(doc, opt, cb)

Creates an elasticsearch document

To create the documents with your own id set the *opt.id* property to the id you want for that document.

### Params:

* **Object** *doc* the body of the elasticsearch document
* **Object** *opt* Optional options objectg
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

## Query API

Click [here](https://github.com/LucioFranco/Rebound-ODM/blob/master/API.md#query) for the Query API

## Search API

Click [here](https://github.com/LucioFranco/Rebound-ODM/blob/master/API.md#search) for the Search API

<!-- End lib/model.js -->

<!-- Start lib/query.js -->

# Query

## findAll(query, opt, cb)

findAll documents with specific query

### Params:

* **Object** *query* object
* **Object** *opt* Optional options object
* **Function** *cb* Optional callback

### Return:

* **Promise** If there is no callback it will return a promise

<!-- End lib/query.js -->

<!-- Start lib/schema.js -->

# Schema

## getIndexMappingJSON()

Get the elasticsearch index mapping for the Schema

### Return:

* **Object** Returns the elasticsearch mapping for the schema

## validateDoc

Validate a doc vs the schema

### Params:

* **Object** *doc* that you want to validate

### Return:

* **Array** Returns an array of errors

## applySchema(doc)

Applies the Schema to the doc. It will clean up the doc if it needs to.

### Params:

* **Object** *doc* that will be applied

### Return:

* **Object** Returns the applied Schema object

<!-- End lib/schema.js -->

<!-- Start lib/search.js -->

# Search

## searchQuery(query, options, callback)

Search the model based off of a elasticsearch Query string

### Params:

* **String** *query* based of elasitcsarch query string
* **Object** *options* Options for the es call
* **Function** *callback* Optional callback

### Return:

* **Promise** Returns a promise unless there is a callback

## searchBody(body, options, callback)

Search the model based of a elasticsearch body object

### Params:

* **Object** *body* object with more search options
* **Object** *options* Options for the es call
* **Function** *callback* Optional callback

### Return:

* **Promise** Returns a promise unless there is a callback

## get(id, options, callback)

Get document by document Id

### Params:

* **String|Number|ElasitcsearchId** *id* document id
* **Object** *options* Options for the es call
* **Function** *callback* Optional callback

### Return:

* **Promise** Returns a promise unless there is a callback

<!-- End lib/search.js -->

