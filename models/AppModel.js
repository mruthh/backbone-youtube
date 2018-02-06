var AppModel = Backbone.Model.extend({
  defaults: function () {
    return {
      // current_video: null,
      searchTerm: null,
      videos: new VideosCollection()
    }
  }
});
