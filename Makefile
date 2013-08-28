
build: npm bower site

npm:
	@npm install

bower:
	@bower install

site: clean
	@./bin/build

md: clean
	@./bin/build

test:

clean:
	@rm -rf ./generated/*

.PHONY: test
