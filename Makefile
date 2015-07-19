TESTS = $(shell find test -name '*.test.js')
REPORTER = spec
SRC = lib/**
DOC_OUTPUT = API.md

docs:
	@./node_modules/.bin/markdox \
				$(SRC) \
				--output $(DOC_OUTPUT)

test:
	@./node_modules/.bin/mocha \
    		--recursive \
    		--reporter $(REPORTER) \
    		$(TESTS)

test-coverage:
	istanbul cover _mocha -- \
    		--recursive \
    		--reporter $(REPORTER) \
    		$(TESTS)

report-coverage:
	cat ./coverage/lcov.info | ./node_modules/.bin/coveralls

clean:
	rm -r -f coverage

.PHONY: test test-coverage clean report-coverage docs
