var VideoView = Backbone.View.extend({
  className: 'row p-1 thumbnail',
  events:{
    //listen for clicks on thumbnail. when clicked, set mainVideo to true. find previous mainVideo and set to false.
    'click': 'changeMainVideo'
  },
  initialize: function(){
    //if mainVideo attribute changes, show or hide thumbnail
    this.listenTo(this.model, 'change:mainVideo', this.toggleHide)
    //if model is removed, remove view
    this.listenTo(this.model, 'remove', this.removeVideoView)
  },
  template: Handlebars.compile($('#thumbnail-template').html()),

  removeVideoView: function(){
    console.log('removed')
    this.remove();
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes))
    //if this video is set as main, hide its thumbnail
    if(this.model.get('mainVideo')){
      this.$el.addClass('d-none')
    }
    return this;
  },

  toggleHide: function(){
    this.$el.toggleClass('d-none');
  },

  changeMainVideo: function(){
    //first, change existing mainVideo to false
    var currentMainVideo = appModel.get('videos').findWhere({mainVideo:true})
      if (currentMainVideo){
      currentMainVideo.set('mainVideo', false);
    }
    //then change clicked video's mainVideo attribute to true
    this.model.set('mainVideo', true);
  }

});
