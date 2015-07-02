/**
Undo changes in the store made to an existing but not-saved
model. This should be mixed into 'edit' routes like
`CampaignEditRoute` and `BusinessEditRoute`. All non-persisted
changes to the model are undone.

@class DireyRecordHandler
@submodule mixins
*/

import Ember from 'ember';
import defaultFor from 'ember-easy-form-extensions/utils/default-for';

const { on } = Ember;

export default Ember.Mixin.create({

  /**
  If the model `isDirty` (i.e. some data has been temporarily
  changed) rollback the record to the most recent clean version
  in the store. If there is no clean version in the store,
  delete the record.

  TODO - add ability to stop transition and ask for transition confirm

  @method rollbackifDirty
  */

  rollbackIfDirty: on('willTransition', function(model) {
    model = defaultFor(model, this.get('controller.model'));

    if (model.get('isDirty')) {
      if (model.get('id')) {
        model.rollback();
      } else {
        model.deleteRecord();
      }
    }
  }),

});
