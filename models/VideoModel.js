var VideoModel = Backbone.Model.extend({
  defaults: function(){
    return {
      title: '',
      description: '',
      thumbnailUrl: null,
      videoUrl: null,
      mainVideo: false
    }
  },
    parse: function(data){
      return {
        title: data.snippet.title,
        description: data.snippet.description,
        thumbnailUrl: data.snippet.thumbnails.high.url,
        videoUrl: `https://www.youtube.com/embed/${data.id.videoId}`,
      }
  }
})
