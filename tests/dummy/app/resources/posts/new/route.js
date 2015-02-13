import Ember from 'ember';
import DeleteRecord from 'ember-easy-form-extensions/mixins/routes/delete-record';

export default Ember.Route.extend(
  DeleteRecord, {

  model: function() {
    return this.store.createRecord('post');
  }

});
