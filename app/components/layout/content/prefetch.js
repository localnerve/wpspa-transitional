/*
 * prefetch
 *
 * Starts requests to populate entities.
 * Prefetch is started on the "content:fetch" event for the given event aggregator.
 * Allows multiple fetches, can be rerun to add additional, unique fetches.
 *
 */
define([
  "underscore",
  "jquery",
  "app",
  "components/layout/content/promises",
  "module"
], function(_, $, app, promises, module) {

  // Construct a prefetch object on the given event aggregator
  function Prefetch(eventAggregator, timeout) {
    var self = this;

    // The collection of promises, keyed by object_type
    this._promises = {};

    // The public interface to promises
    this.promises = promises.create(eventAggregator, this._promises);

    // The request timeout for this Prefetch instance
    this.timeout = timeout || module.config().timeout;

    // Handle content:prefetch
    eventAggregator.on("content:prefetch", function(items) {
      self._fetch(items);
    });
  }

  //
  // Prefetch methods
  //
  _.extend(Prefetch.prototype, {

    // Method that performs the fetching
    _fetch: function(items) {
      var self = this;
      if (!_.isArray(items)) items = [items];

      // Prefetch unique entity types
      _.each(items, function(item) {
        var promise = self._promises[item.object_type];

        // If object_type not already fetched or has previously failed
        // If the object type and id are not found
        var needsFetch = !promise || promise.state() === "rejected" ||
          (
            promise.state() === "resolved" &&
            !app.request("content:entity:find", {
              object_type: item.object_type,
              object_id: item.object_id
            })
          );

        // If needs total or partial fetch
        if (needsFetch) {
          var dfd = $.Deferred();

          // Get a unqiue set by object_type, items might not be homogenous
          var typedItems = _.where(items, { object_type: item.object_type });

          // Get the first custom entity creator for the set, if any
          var entityFactory = _.find(typedItems, function(i) { return !!i.create; });

          // Create or retrieve the entity
          var entityResult = app.request("content:entity", {
            object_type: item.object_type,
            items: typedItems,
            create: entityFactory ? entityFactory.create : undefined
          });

          // Support appending to the entity
          var remove = true;
          if (!entityResult.createdNew && _.isFunction(entityResult.entity.mergeItems)) {
            remove = false;
            entityResult.entity.mergeItems(typedItems);
          }

          // Listen to the request event and notify the promise holder
          entityResult.entity.once("request", function() {
            if (dfd.state() === "pending") {
              // Progress notification
              dfd.notify();
            }
          });

          // Keep this promise, blow away a failed promise
          self._promises[item.object_type] = dfd.promise();

          // Fetch the object_type
          entityResult.entity.fetch({
            // if the entity is being appended, don't remove what is there
            remove: remove,

            // Request timeout
            timeout: self.timeout,

            // Forward the "success" event to the promise holder
            success: function(collection) {
              // Success notification
              dfd.resolve(collection);
            },
            // Forward the "fail" event to the promise holder
            error: function() {
              // Fail notification
              dfd.reject(typedItems);
            }
          });
        }
      });
    }
  });

  return {
    // Create and return a new Prefetch object
    _create: function(eventAggregator) {
      return new Prefetch(eventAggregator);
    },
    // Get a promises collection on a new Prefetch
    promises: function(eventAggregator) {
      return (new Prefetch(eventAggregator)).promises;
    }
  };

});
