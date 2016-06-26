# Rebound-ODM

[![npm](https://img.shields.io/npm/v/reboundodm.svg)](https://npmjs.com/reboundodm) [![Build Status](https://travis-ci.org/LucioFranco/Rebound-ODM.svg?branch=master)](https://travis-ci.org/LucioFranco/Rebound-ODM) [![Coverage Status](https://coveralls.io/repos/LucioFranco/Rebound-ODM/badge.svg?branch=master&service=github)](https://coveralls.io/github/LucioFranco/Rebound-ODM?branch=master) [![David](https://img.shields.io/david/LucioFranco/Rebound-ODM.svg)](https://github.com/LucioFranco/Rebound-ODM) [![GitHub license](https://img.shields.io/github/license/LucioFranco/Rebound-ODM.svg)](https://github.com/LucioFranco/Rebound-ODM)

## Introduction

> Note: This is a fork from [boatmeme/Rebound-js](https://github.com/boatmeme/rebound-js) and is in heavy development

An ElasticSearch ODM for Node.js. Use ElasticSearch as your primary document store...Elastic connection!

## Goals

To provide an Object->Document Mapper (ODM) for Elasticsearch, enabling quick, OOTB development of CRUD apps backed by Elasticsearch as a document store, while still providing easy access to advanced configuration and search features.

We're just beginning, but I'm incorporating many of the lessons learned from several years of using Elasticsearch as a primary data store, running the gamut of use cases from schema-less "shove-it-and-forget-it" scenarios to highly specialized search analyzers and aggregations across multiple indices and document types.

## Installation

```
npm install reboundodm
```

## Examples:

First you must establish your connection to your es node

```
var Rebound = require('reboundodm');
Rebound.connect('localhost:9200');
```

To create a Rebound schema:

```
var UserSchema = Rebound.Schema({
    _id: { type: 'string', default: uuid() },
    name: String,
    description: { type: 'string', analyzer: 'not_analyzed' }
  });
```

To create a Rebound Model:

```
var User = Rebound.modelIndex('ExampleIndex', 'Users', UserSchema);
```

Once you have a Rebound model you can now do CRUD opterations and Search query on the models index:

```
User.create({
    name: 'Alex',
    description: 'Young male with a future'
  })
  .then(function (result) {
      // returns a bluebird promise
    });

User.searchBody({
    query: {
      match: {
        name: 'Alex'
      }
    }
  })
  .then(function (result) {
      // returns a bluebird promise
    });
```

To find more about the model api check the [API docs](https://github.com/LucioFranco/Rebound-ODM/blob/master/API.md).

## Roadmap

Check out the [roadmap](https://github.com/LucioFranco/Rebound-ODM/issues/1).

## API

Check out the [API](https://github.com/LucioFranco/Rebound-ODM/blob/master/API.md). More examples are coming soon for right now these docs are basic.

## Testing

Tests are written as integrated, behavioral tests of the exposed API. Included Vagrantfile to stand-up a live Elasticsearch instance.

* vagrant up or have an instance of Elasticsearch running locally
* npm test

## Releases

  - 0.1.0 - Inital release
