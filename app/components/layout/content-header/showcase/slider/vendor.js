define([
  "underscore",
  "jquery",
  "module"
], function(_, $, module) {
  var useMed = window.Modernizr.mq(module.config().mediumImageTest);
  var oldie = $("html").hasClass("lt-ie9");

  var sliderId = module.config().sliderId;
  var orbitParams = module.config().orbit;

  function render($el, items, links) {
    var orbit = $el.find("#" + sliderId);//.empty();
    var hasLink, $slide, captions = $("<div></div>");

    if (items) {
      var parent = orbit.parent();

      // build slides and captions
      _.each(items, function(item) {
        captions.append("<span class='orbit-caption' id='"+item.slug+"'>"+item.caption+"</span>");

        hasLink = !!(links && links[item.slug]);

        $slide = $("<img id='img-"+item.slug+"' />")
          .attr({
            src: item.url,
            width: item.images.full.width,
            height: item.images.full.height,
            "data-caption": "#"+item.slug
/*
            src: useMed ? item.images.medium.url : item.url,
            width: useMed ? item.images.medium.width : item.images.full.width,
            height: useMed ? item.images.medium.height : item.images.full.height
*/
          });

        if (!oldie) {
          $slide = $("<a href='"+(hasLink ? links[item.slug] : window.location.pathname)+"' "+
            (hasLink ? "" : "class='no-link'") + "></a>").attr({
            "data-caption": "#"+item.slug
          }).append($slide);
        }

        orbit.append($slide);
      });
      
      parent.append(captions.html());
      captions.empty();
    }

    $(function() {
      $("#slider").removeClass("spinner");
      _.defer(function() { 
        orbit.orbit(_.extend(orbitParams, {
          afterLoadComplete: function() {
            $("#" + sliderId).addClass("js-slider-shadow");
          }
        }));
      });
    });
  }

  return {
    sliderId: sliderId,
    render: render
  };

});