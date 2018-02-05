var VideoView = Backbone.View.extend({
  events:{
    //listen for clicks on thumbnail. when clicked, set mainVideo to true. find previous mainVideo and set to false.
  },
  initialize: function(){

  },
  template: Handlebars.compile($('#thumbnail-template').html()),

  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this;
  }

});
