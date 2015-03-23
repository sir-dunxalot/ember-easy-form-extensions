import Ember from 'ember';

export default Ember.Component.extend({
  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'submission'],
  formSubmitted: Ember.computed.readOnly('parentView.controller.formSubmitted'),
  submit: true,
  submitText: 'Save',

  actions: {
    cancel: function() {
      this.get('formView').send('cancel');
    }
  },

  formView: function() {
    var walkViews = function(view) {
      var parentView;

      if (view.submit) {
        return view;
      } else {
        parentView = view.get('parentView');

        if (parentView) {
          return walkViews(parentView);
        } else {
          Ember.warn('No view found with the Submitting mixin.')
        }
      }
    }

    return walkViews(this.get('parentView'));
  }.property(),

  _watchForEmptyComponent: function() {
    Ember.warn(
      'The {{form-submission}} component is not showing the submit or the cancel button.',
      this.get('cancel') || this.get('submit')
    );
  }.observes('cancel', 'submit'),

});
