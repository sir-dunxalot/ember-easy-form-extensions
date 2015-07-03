import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.Controller.extend(
  FormMixin, {

  categories: Ember.A(['ember', 'rails', 'css']),

  validations: {
    'model.title': {
      presence: true
    },
    'model.description': {
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
  },

  submitHandler: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      console.log('submit handler running');

      resolve();
    });
  }


});
