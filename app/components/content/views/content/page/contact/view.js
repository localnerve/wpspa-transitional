define([
  "jquery",
  "underscore",
  "backbone.marionette",
  "app",
  "helpers/ui",
  "loaders/jst",
  "module",
  "components/content/views/content/page/contact/phone",
  "components/content/entities/specializations/contact/entities"
], function($, _, Marionette, app, ui, loader, module, phoneView, ContactEntity) {

  var ContactView = Marionette.Layout.extend({
    template: "components/content/views/content/page/contact/view",
    templateSuccess: "components/content/views/content/page/contact/result-success",
    templateFailure: "components/content/views/content/page/contact/result-failure",
    templateResultId: "contact-result",
    modalOptions: module.config().modal,
    className: "page-contact",

    regions: {
      phone: "#phone"
    },
    events: {
      "submit #contact-form": "contact"
    },    
    ui: {
      form: "#contact-form",
      progress: ".form-progress",
      name: "#form-name",
      email: "#form-email",
      message: "#form-message"
    },

    modal: function(template, data) {
      var body = $("body");
      if (template) {        
        $("#"+this.templateResultId).remove();
        body.append(
          loader(template, _.extend(data, {
            resultId: this.templateResultId,
            modalSize: body.width() > this.modalOptions.breakpoint ? this.modalOptions.fixedSize : "expand"
          }), app.root)
        );        
        $("#"+this.templateResultId).reveal(this.modalOptions);
      } else {        
        $("#"+this.templateResultId).trigger('reveal:close');
      }
    },

    initialize: function(options) {
      this.businessEntity = app.request("content:entity", { object_type: "business" }).entity.model;
      this.listenTo(app, "webshims:ready", function() {
        this.canValidate = true;
      });
      this.params = options.params || {};
    },
    onRender: function() {
      this.phone.show(phoneView.create());
    },
    onShow: function() {
      if (_.isFunction(this.$el.updatePolyfill)) {
        this.$el.updatePolyfill();
      }
      if (this.params.focus) {
        // attempting to change the prop or attr of an element already in an html document causes error in old ie
        _.defer(function(self) {
          self.ui.name.focus();
          ui.scrollTopConditional($(".slider-container").offset());
        }, this);        
      }      
    },    
    serializeData: function() {
      return {
        content: this.model.get("content")
      };
    },    

    clearForm: function() {
      this.ui.name.prop("value", "");
      this.ui.email.prop("value", "");
      this.ui.message.prop("value", "");
    },
    setResult: function(show, good) {
      if (show) {
        var data = {
          name: this.ui.name.prop("value"),
          email: this.ui.email.prop("value"),
          message: this.ui.message.prop("value"),
          responseTime: this.businessEntity.get("responseTime"),
          businessEmail: this.businessEntity.get("businessEmail"),
          mailTo: this.businessEntity.get("businessEmail")+"/?body="+
            encodeURIComponent(this.ui.message.prop("value")),
          businessPhone: this.businessEntity.get("businessPhone")
        };
        this.modal(good ? this.templateSuccess : this.templateFailure, data);
      } else {
        this.modal();
      }
    },
    contactSuccess_ok: function(data) {
      this.setResult(true, true);
      this.clearForm();      
    },
    contactSuccess_error: function(data) {
      this.setResult(data.error || true, false);
    },
    contactFail: function() {
      this.setResult(true, false);
    },    
    contactProgress: function(done) {
      this.ui.progress.removeClass("hide");
      if (done) {
        this.ui.progress.addClass("hide");
      }
      ui.scrollTopConditional(this.ui.message.offset());
    },
    performContact: _.debounce(
      function(self) {
        var entity = new ContactEntity({
          name: self.ui.name.prop("value"),
          email: self.ui.email.prop("value"),
          message: self.ui.message.prop("value")
        });

        self.listenTo(entity, "request", function() {
          self.contactProgress(false);
        });

        self.setResult();

        entity.fetch({ timeout: module.config().timeout })
          .done(function(data) {
            var method = ContactView.prototype["contactSuccess_"+data.status];
            if (method) {
              method.call(self, data);
            } else {
              self.contactSuccess_error(data);
            }
          })
          .fail(function() {
            self.contactFail();
          })
          .always(function() {
            self.stopListening(entity);
            self.contactProgress(true);
          });
      }, 1000, true // discard invocations within leading edge time (ms)
    ),    
    contact: function(e) {
      var valid = true;
      if (this.canValidate) {
        valid = $(this.ui.form[0]).callProp(checkValidity);
      }
      if (valid) {
        this.performContact(this);
        return false;
      }      
    }
  });

  return {
    create: function(options) {
      return new ContactView(options);
    }
  };
});