# Reboundjs

[![Build Status](https://travis-ci.org/LucioFranco/Reboundjs.svg?branch=master)](https://travis-ci.org/LucioFranco/Reboundjs) [![Coverage Status](https://coveralls.io/repos/LucioFranco/Reboundjs/badge.svg?branch=master&service=github)](https://coveralls.io/github/LucioFranco/Reboundjs?branch=master) [![David](https://img.shields.io/david/LucioFranco/Reboundjs.svg)](https://github.com/LucioFranco/Reboundjs) [![David](https://img.shields.io/david/dev/LucioFranco/Reboundjs.svg)](https://github.com/LucioFranco/Reboundjs) [![GitHub license](https://img.shields.io/github/license/LucioFranco/Reboundjs.svg)](https://github.com/LucioFranco/Reboundjs)

## Introduction

> Note: This is a fork from [boatmeme/Rebound-js](https://github.com/boatmeme/rebound-js) and is in heavy development

An ElasticSearch ODM for Node.js. Use ElasticSearch as your primary document store...Elastic connection!

## Goals

To provide an Object->Document Mapper (ODM) for Elasticsearch, enabling quick, OOTB development of CRUD apps backed by Elasticsearch as a document store, while still providing easy access to advanced configuration and search features.

We're just beginning, but I'm incorporating many of the lessons learned from several years of using Elasticsearch as a primary data store, running the gamut of use cases from schema-less "shove-it-and-forget-it" scenarios to highly specialized search analyzers and aggregations across multiple indices and document types.

## Roadmap

Check out the [roadmap](https://github.com/LucioFranco/Reboundjs/issues/1).

## Testing

Tests are written as integrated, behavioral tests of the exposed API. Included Vagrantfile to stand-up a live Elasticsearch instance (1.5 as of 03/26/2015)

* vagrant up or have an instance of Elasticsearch running locally
* npm test
