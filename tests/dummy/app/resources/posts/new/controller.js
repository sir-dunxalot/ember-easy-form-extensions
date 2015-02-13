import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  validations: {
    title: {
      presence: true
    }
  },

  cancel: function() {
    this.transitionToRoute('index');
  }

});
