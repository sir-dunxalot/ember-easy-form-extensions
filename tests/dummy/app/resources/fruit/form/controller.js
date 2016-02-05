import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.Controller.extend(
  FormMixin, {

  colors: Ember.A(['orange', 'yellow', 'green']),

  validations: {
    'model.name': {
      presence: true
    },
    'model.description': {
      presence: true
    },
  },

  save: function() {
    Ember.debug('Saving');
  },

  cancel: function() {
    this.transitionToRoute('index');
  },

  submitHandler: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.debug('Submit handler running');

      resolve();
    });
  }


});
