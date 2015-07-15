TESTS = $(shell find test -name '*.test.js')
REPORTER = spec

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

.PHONY: test test-coverage clean report-coverage
