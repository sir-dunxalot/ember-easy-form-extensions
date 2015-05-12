import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.Controller.extend(
  Saving, {

  validations: {
    'model.title': {
      presence: true
    }
  },

  save: function() {
    console.log('Saving');
  },

  cancel: function() {
    this.transitionToRoute('index');
  },

  destroy: function() {
    console.log('Destroying');
  }

});
