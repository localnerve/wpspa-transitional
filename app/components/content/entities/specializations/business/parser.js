define([
  "jquery",
  "helpers/contract"
], function($, contract) {

  var theDate = new Date();

  function parse(data) {
    // this is a collection, but for now we are only taking the first post
    var firstPost = (data.posts && data.posts[0]) ? data.posts[0] : null;
    contract(firstPost, "content", "custom_fields.response_time.0");

    var responseTime = firstPost.custom_fields.response_time[0];
    var content = firstPost.content;
    var $content = $("<div>"+content+"</div>");
    var businessName = $content
        .find("[itemtype='http://schema.org/LocalBusiness'] [itemprop='name']")
        .text();
    var businessPhone = $content
        .find("[itemtype='http://schema.org/LocalBusiness'] [itemprop='telephone']")
        .text();
    var businessEmail = $content
        .find("[itemtype='http://schema.org/LocalBusiness'] [itemprop='email']")
        .text();

    $content.empty();

    return {
      content: content,
      copyYear: theDate.getFullYear(),
      responseTime: responseTime,
      businessName: businessName,
      businessPhone: businessPhone,
      businessEmail: businessEmail
    };
  }

  return parse;
});