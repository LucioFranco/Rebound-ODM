

<!-- Start lib/index.js -->

## connect(host, opt)

Connects to a specific node

### Params:

* **string** *host* 
* **Object** *opt* Options for the elasticsearch clien

<!-- End lib/index.js -->

<!-- Start lib/model.js -->

## search

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

