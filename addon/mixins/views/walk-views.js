import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

  formView: computed(function() {
    return this.walkViews(this.get('parentView'));
  }),

  walkViews(view) {

    if (view.submit) {
      return view;
    } else {
      const parentView = view.get('parentView');

      if (parentView) {
        return this.walkViews(parentView);
      } else {
        Ember.warn('No view found with the Submitting mixin.');
      }
    }
  },

});
