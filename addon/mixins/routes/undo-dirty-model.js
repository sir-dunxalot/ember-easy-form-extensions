/**
Undo changes in the store made to an existing but not-saved
model. This should be mixed into 'edit' routes like
`CampaignEditRoute` and `BusinessEditRoute`. All non-persisted
changes to the model are undone.

@class DirtyRecordHandler
@submodule mixins
*/

import Ember from 'ember';

export default Ember.Mixin.create({

  actions: {

    /**
    If the model `isDirty` (i.e. some data has been temporarily
    changed) rollback the record to the most recent clean version
    in the store. If there is no clean version in the store,
    delete the record.

    TODO - add ability to stop transition and ask for transition confirm

    @event willTransition
    */

    willTransition() {
      this._super(...arguments);

      const model = this.get('controller.model');

      if (model.get('isNew')) {
        model.deleteRecord();
      } else if (model.get('hasDirtyAttributes')) {
        model.rollbackAttributes();
      }
    }
  }

});
