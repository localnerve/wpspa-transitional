describe("Contact Page", function() {

  var selector = "#dynamic-content";
  var app = window.__test.app;
  var router = window.__test.app.router;

  it("should produce "+selector+" and have Contact content", function(done) {
    router.mainLayout.once("afterRender", function() {
      expect($(selector).is(":visible")).to.be.true;
      expect(document.title).to.have.string("Contact");
      // add more/better content tests, consider loading pageData.json as fixture
      done();
    });
    router.contact();
    //Backbone.history.navigate("/contact", true);
  });

  // router.contact had to be called before this test suite 
  describe("Form Interactions", function() {

    var submitSelector = "#submit";

    before(function() {
      // stub the contact save 
      this.contact_save = sinon.stub(router.contactView.model, "save");
    });

    after(function() {
      this.contact_save.restore();
    });

    it("submit button should exist", function() {
      var submitButton = $(submitSelector);
      expect(submitButton).to.exist;
    });

    it("should contain expected form input", function() {
      var formInput = $(router.contactView.inputSelector);
      expect(formInput.length).to.be.within(2,5);
    });

    it("should not call save on an empty form", function() {
      var submitButton = $(submitSelector);
      submitButton.click();
      this.contact_save.should.not.have.been.called;
    });

    it("Only Name field should not be a valid form", function() {
      var submitButton = $(submitSelector);
      var form = document.getElementById(router.contactView.formId);
      var field = $("#form-name");
      expect(field.length).to.equal(1);
      field[0].value = "Mike Johns";

      submitButton.click();

      this.contact_save.should.not.have.been.called;
      expect(form.checkValidity()).to.be.false;
      field[0].value = "";
    });

    it("Only Email field should not be a valid form", function() {
      var submitButton = $(submitSelector);
      var form = document.getElementById(router.contactView.formId);
      var field = $("#form-email");
      expect(field.length).to.equal(1);
      field[0].value = "mike@company.com";

      submitButton.click();

      this.contact_save.should.not.have.been.called;
      expect(form.checkValidity()).to.be.false;
      field[0].value = "";
    });

    it("Only Message field should not be a valid form", function() {
      var submitButton = $(submitSelector);
      var form = document.getElementById(router.contactView.formId);
      var field = $("#form-message");
      expect(field.length).to.equal(1);
      field[0].value = "What time is it?";

      submitButton.click();

      this.contact_save.should.not.have.been.called;
      expect(form.checkValidity()).to.be.false;
      field[0].value = "";
    });

    it("Just Name and Email fields should not be a valid form", function() {
      var submitButton = $(submitSelector);
      var form = document.getElementById(router.contactView.formId);
      var field1 = $("#form-name");
      var field2 = $("#form-email");
      expect(field1.length).to.equal(1);
      expect(field2.length).to.equal(1);
      field1[0].value = "Mike Johns";
      field2[0].value = "mike@company.com";

      submitButton.click();

      this.contact_save.should.not.have.been.called;
      expect(form.checkValidity()).to.be.false;
      
      field1[0].value = "";
      field2[0].value = "";
    });

    it("Just Name and Message fields should not be a valid form", function() {
      var submitButton = $(submitSelector);
      var form = document.getElementById(router.contactView.formId);
      var field1 = $("#form-name");
      var field2 = $("#form-message");
      expect(field1.length).to.equal(1);
      expect(field2.length).to.equal(1);
      field1[0].value = "Mike Johns";
      field2[0].value = "What time is it?";

      submitButton.click();

      this.contact_save.should.not.have.been.called;
      expect(form.checkValidity()).to.be.false;

      field1[0].value = "";
      field2[0].value = "";
    });

    it("Just Message and Email fields should not be a valid form", function() {
      var submitButton = $(submitSelector);
      var form = document.getElementById(router.contactView.formId);
      var field1 = $("#form-message");
      var field2 = $("#form-email");
      expect(field1.length).to.equal(1);
      expect(field2.length).to.equal(1);
      field1[0].value = "What time is it?";
      field2[0].value = "mike@company.com";

      submitButton.click();

      this.contact_save.should.not.have.been.called;
      expect(form.checkValidity()).to.be.false;

      field1[0].value = "";
      field2[0].value = "";
    });

    it("Bad Email field should not be a valid form", function() {
      var submitButton = $(submitSelector);
      var form = document.getElementById(router.contactView.formId);
      var field1 = $("#form-name");
      var field2 = $("#form-email");
      var field3 = $("#form-message");
      expect(field1.length).to.equal(1);
      expect(field2.length).to.equal(1);
      expect(field3.length).to.equal(1);
      field1[0].value = "Mike Johns";
      field2[0].value = "mike+company.com";
      field3[0].value = "What time is it?";

      submitButton.click();

      this.contact_save.should.not.have.been.called;
      expect(form.checkValidity()).to.be.false;

      field1[0].value = "";
      field2[0].value = "";
      field3[0].value = "";
    });

    it("All good fields should be a valid form", function() {
      var submitButton = $(submitSelector);
      var form = document.getElementById(router.contactView.formId);
      var field1 = $("#form-name");
      var field2 = $("#form-email");
      var field3 = $("#form-message");
      expect(field1.length).to.equal(1);
      expect(field2.length).to.equal(1);
      expect(field3.length).to.equal(1);
      field1[0].value = "Mike Johns";
      field2[0].value = "mike@company.com";
      field3[0].value = "What time is it?";

      submitButton.click();

      this.contact_save.should.have.been.calledOnce;
      expect(form.checkValidity()).to.be.true;

      field1[0].value = "";
      field2[0].value = "";
      field3[0].value = "";
    });

  });

});