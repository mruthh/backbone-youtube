var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'keypress #search': 'searchOnEnter'
  },

  initialize: function(){
    //listen for change in model's VideosCollection and create new views for each videoModel
    this.$videos = $('#videos-container');
    this.$thumbnails = $('#thumbnails-container');
    this.listenTo(this.model.get('videos'), 'add', this.renderVideos);
    this.listenTo(this.model.get('videos'), 'change:mainVideo', this.render);
    this.listenTo(this.model.get('searchTerm'))
    //run search function with default terms on load
    this.search('junior%20bulldog')
  },

  template: Handlebars.compile($('#main-video-template').html()),

  renderVideos: function(video){
    //set first result's mainVideo attribute to true
    appModel.get('videos').at(0).set('mainVideo', true)
    //when new video added, create new view for that video, then append to videos list
    var videoView = new VideoView({ model: video});
    this.$thumbnails.append(videoView.render().el);
  },

  render: function(){
    this.mainVideo = appModel.get('videos').findWhere({mainVideo: true});
    //only change view when a new mainVideo has been added
    if(this.mainVideo){
      //set mainVideo, append main video to videos container, then append thumbnails
      this.$videos.empty();
      //put first element in container into main video template
      this.$videos.append(this.template(this.mainVideo.attributes))
      //remove current main video from sidebar OR get all videos and add to sidebar
      appModel.get('videos')
    }
    return this;
  },
  search: function(input){
    // update collection URL and fetch videos
    this.model.searchTerm = input;
    this.searchUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC8fgos94ydLf_pDTtLOIIP8HcEhdrSxtM&part=snippet&type=video&q=${input}`;
    this.videos = appModel.get('videos')
    //first, remove all videos previously in collection
    this.videos.remove(this.videos.toArray())
    this.videos.url = this.searchUrl;
    this.videos.fetch({
      success: function(){
      },
      error: function(){
        alert('No videos found. Please check your search terms and try again.')
      }
    });

  },
  searchOnEnter: function(e){
    //when user enters search term, validate their input
    //if input is valid, search using input
    this.$input = $('#search').val();
    if (this.$input && e.keyCode === 13){
      //can we validate that user input is url-safe?
      this.search(this.$input);
    }
  }

})
