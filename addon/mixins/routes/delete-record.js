import Ember from 'ember';

export default Ember.Mixin.create({

  deleteRecord: Ember.on('willTransition', function() {
    var model = this.get('controller.content');

    if (model.get('isDirty')) {
      model.deleteRecord();
    }
  }),

});
