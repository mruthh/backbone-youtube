var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'keypress #search': 'searchOnEnter'
  },

  initialize: function(){
    //listen for change in model's VideosCollection and create new views for each videoModel
    this.$videos = $('#videos-container');
    // this.$thumbnails = $('#thumbnails-container');
    this.listenTo(this.model.get('videos'), 'add', this.renderVideos);
    this.listenTo(this.model.get('videos'), 'change:mainVideo', this.render)
  },

  template: Handlebars.compile($('#main-video-template').html()),

  renderVideos: function(video){
    //when new video added, create new view for that video, then append to videos list
    var videoView = new VideoView({ model: video});
    this.$thumbnails = this.$el.find('#thumbnails-container');
    console.log(this.$thumbnails)
    this.$thumbnails.append(videoView.render().el);
  },

  render: function(){
    //set mainVideo, append main video to videos container, then append thumbnails
    this.$videos.empty();
    this.mainVideo = appModel.get('videos').findWhere({mainVideo: true});
    //put first element in container into main video template
    this.$videos.prepend(this.template(this.mainVideo.attributes))
    //remove current main video from sidebar OR get all videos and add to sidebar
    this.sidebarVideos = appModel.get('videos').where({mainVideo: false});

    return this;
  },

  searchOnEnter: function(e){
    //when user enters search term, update collection URL and fetch videos
    //does collection need to be emptied first??
    this.$input = $('#search').val();
    if (this.$input && e.keyCode === 13){ //anything else we need to check for to validate?
      this.model.searchTerm = this.$input;
      this.searchUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC8fgos94ydLf_pDTtLOIIP8HcEhdrSxtM&part=snippet&q=${this.$input}`;
      var videos = appModel.get('videos')
      videos.url = this.searchUrl;
      videos.fetch({
        success: function(){
      //set first result's mainVideo attribute to true
          videos.at(0).set('mainVideo', true)
        },
        error: function(){
          alert('No videos found. Please try again.')
        }
      });


    }
  }

})
