var AppModel = Backbone.Model.extend({
  defaults: function () {
    return {
      searchTerm: null,
      videos: new VideosCollection(),
      //in the case of a search with no results, videosFound will be set to false and an error will be shown to the user.
      videosFound: true
    }
  }
});
