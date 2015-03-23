import Ember from 'ember';
import Submitting from 'ember-easy-form-extensions/mixins/views/submitting';

export default Ember.View.extend(
  Submitting, {

  submitHandler: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      console.log('submitting');

      resolve();
    });
  }

});
