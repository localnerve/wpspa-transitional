define([
  "underscore",
  "helpers/contract"
], function(_, contract) {

  // enforced by naming convention in CMS
  function makeSlugWithQualifier(model, qualifier) {
    return model.get("slug")+(qualifier ? "-"+qualifier : "");
  }

  function findPostBySlug(model, slug) {
    var result = _.find(model.get("posts"), function(post) {
      return post.slug === slug;
    });
    return result;
  }

  function findPostByQualifiedSlug(model, qualifier) {
    return findPostBySlug(model, makeSlugWithQualifier(model, qualifier));
  }

  function findCategoryArrayBySlug(model, slug) {
    var array = model.get("posts");
    var result = _.find(array, function(item) {
      return _.find(item.categories, function(category) {
        return category.slug === slug;
      });
    });
    return result;
  }

  function parse(data) {
    contract(data, "category", "posts");
    return _.extend(data.category, { posts: data.posts });
  }

  return {
    findPostBySlug: findPostBySlug,
    findPostByQualifiedSlug: findPostByQualifiedSlug,
    findCategoryArrayBySlug: findCategoryArrayBySlug,
    makeSlugWithQualifier: makeSlugWithQualifier,
    parse: parse
  };
});