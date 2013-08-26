define(["app/views/app", "expect", "sinon"], function(theView, expect, sinon) {

    describe("views/app", function() {

        it("should do something", function(){

            console.log("testing..")

            var target = new theView();
            var stub = sinon.stub(target, "initialize");

            expect("something").to.equal("something");


        });

    });

});