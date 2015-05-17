import Ember from 'ember';
import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';

export default Ember.Route.extend(
  DirtyRecordHandler, {

  model: function() {
    return this.store.createRecord('post');
  }

});
