describe("Home Page", function() {

  var selector = "#dynamic-content";
  var app = window.__test.app;
  var router = window.__test.app.router;

  it("Should produce "+selector+" and have Home content", function(done) {
    router.mainLayout.once("afterRender", function() {
      expect($(selector).is(":visible")).to.be.true;
      expect(document.title).to.equal("North Star Cleaning Service");
      // add more/better content tests, consider loading pageData.json as fixture
    });
    // this page has art, so don't let the test complete before the art is done
    app.modules.art.once("art", function() {
      //console.log("TEST DONE!");
      done();
    });
    // exercise the home route
    router.index();
    //Backbone.history.navigate("/", true);
  });

});