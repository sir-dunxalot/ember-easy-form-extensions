import Ember from 'ember';

export default Ember.Mixin.create({

  rollback: Ember.on('willTransition', function() {
    var model = this.get('controller.content');

    if (model.get('isDirty')) {
      model.rollback();
    }
  }),

});
