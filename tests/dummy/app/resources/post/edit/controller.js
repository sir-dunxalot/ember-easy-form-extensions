import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.Controller.extend(
  FormMixin, {

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
