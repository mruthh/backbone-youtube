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
    this.listenTo(this.model, 'change:videosFound', this.showError);
    this.listenTo(this.model, 'change:searchTerm', this.clearSearchBox)
    //run search function with default terms on load
    this.search('baby%20bat%20burritos')
  },

  template: Handlebars.compile($('#main-video-template').html()),

  renderVideos: function(video){
    //set first result's mainVideo attribute to true
  this.model.get('videos').at(0).set('mainVideo', true)
    //when new video added, create new view for that video, then append to videos list
    var videoView = new VideoView({ model: video});
    this.$thumbnails.append(videoView.render().el);
  },

  render: function(){
    this.mainVideo = this.model.get('videos').findWhere({mainVideo: true});
    //only change view when a new mainVideo has been added
    if(this.mainVideo){
      //set mainVideo, append main video to videos container, then append thumbnails
      this.$videos.empty();
      //put first element in container into main video template
      this.$videos.append(this.template(this.mainVideo.attributes))
      //remove current main video from sidebar OR get all videos and add to sidebar
      this.model.get('videos')
    }
    return this;
  },
  search: function(input){
    // update search term and collection URL and fetch videos
    this.model.set('searchTerm', input);
    this.searchUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC8fgos94ydLf_pDTtLOIIP8HcEhdrSxtM&part=snippet&type=video&q=${input}`;
    var videos = this.model.get('videos')
    //first, remove all videos previously in collection
    videos.url = this.searchUrl;
    videos.remove(videos.toArray());
    videos.fetch({
      success: function(){
        //check that >0 videos returned. If no videos, set model.videosFound to false
        if (_.isEmpty(appModel.get('videos').toArray())){
          appModel.set('videosFound', false);
        } else {
          appModel.set('videosFound', true);
        }
      },
      error: function(){
        window.alert('Error fetching videos. Please try again.')
      }
    });

  },
  searchOnEnter: function(e){
    //only use the first 50 characters of input
    this.$input = $('#search').val().slice(0, 50);
    //but make sure input is not null
    if (this.$input && e.keyCode === 13){
    //if input is valid, search using input
      this.search(this.$input);
    }
  },
  errorTemplate: Handlebars.compile($('#error-template').html()),
  showError: function (){
    //listen for change in videosFound. if false, empty videoscontainer and show error
    if (!this.model.get('videosFound')){
      this.$videos.html(this.errorTemplate(this.model.attributes));
    }
  },

  clearSearchBox: function(){
    $('#search').val('');
  }

})
