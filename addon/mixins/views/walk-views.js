import Ember from 'ember';

export default Ember.Mixin.create({

  formView: function() {
    return this.walkViews(this.get('parentView'));
  }.property(),

  walkViews: function(view) {
    var parentView;

    if (view.submit) {
      return view;
    } else {
      parentView = view.get('parentView');

      if (parentView) {
        return this.walkViews(parentView);
      } else {
        Ember.warn('No view found with the Submitting mixin.');
      }
    }
  },

});
