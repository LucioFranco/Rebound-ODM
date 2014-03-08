TESTS = $(shell find test/ -name '*.test.js')
REPORTER = spec

test:
  ./node_modules/.bin/mocha \
    --recursive \
    --reporter $(REPORTER) \
    $(TESTS)

.PHONY: test