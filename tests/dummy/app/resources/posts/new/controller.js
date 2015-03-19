import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  validations: {
    title: {
      presence: true
    }
  },

  save: function() {
    console.log(this);
  },

  cancel: function() {
    this.transitionToRoute('index');
  }

});

