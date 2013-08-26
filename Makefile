
build: npm bower generate

npm:
	@npm install

bower:
	@bower install

generate: clean
	./bin/build

test:

clean:
	@rm -rf ./generated/*

.PHONY: test