import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.Controller.extend(
  Saving, {

  categories: Ember.A(['ember', 'rails', 'css']),

  validations: {
    'model.title': {
      presence: true
    },
    'model.category': {
      presence: true
    }
  },

  save: function() {
    console.log('Saving');
  },

  cancel: function() {
    this.transitionToRoute('index');
  }

});
