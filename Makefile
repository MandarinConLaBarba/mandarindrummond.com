
build: npm bower compile

npm:
	@npm install

bower:
	@bower install

compile:
	./bin/build

clean:
	@rm -rf ./generated/*

