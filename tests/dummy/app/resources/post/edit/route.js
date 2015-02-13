import Ember from 'ember';
import Rollback from 'ember-easy-form-extensions/mixins/routes/rollback';

export default Ember.Route.extend(
  Rollback, {

  model: function() {
    return this.modelFor('post');
  }

});
