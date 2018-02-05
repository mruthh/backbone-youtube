var VideosCollection = Backbone.Collection.extend({
  url: null,
  model: VideoModel,
  parse: function(data){
    return data.items
  }
});
