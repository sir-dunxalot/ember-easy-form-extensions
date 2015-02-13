import Ember from 'ember';

export default Ember.Mixin.create({

  rollback: function() {
    var model = this.get('controller.content');

    if (model.get('isDirty')) {
      model.rollback();
    }
  }.on('willTransition'),

});
