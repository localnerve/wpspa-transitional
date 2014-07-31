define([
  "backbone.marionette",
  "app"
], function(Marionette, app) {

  var PhoneView = Marionette.ItemView.extend({
    template: "components/content/views/content/page/contact/phone",
    className: "phone-container",
    serializeData: function() {
      return {
        businessPhone: this.model.get("businessPhone")
      };
    }
  });

  return {
    create: function() {
      var req = app.request("content:entity", { object_type: "business" });
      return new PhoneView(req.entity);
    }
  };
});