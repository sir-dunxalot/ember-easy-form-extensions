import Ember from 'ember';
import layout from '../templates/components/destroy-submission';
import WalkViews from 'ember-easy-form-extensions/mixins/views/walk-views';

export default Ember.Component.extend(
  WalkViews, {

  classNames: ['buttons'],
  destroyText: 'Delete',
  formSubmitted: Ember.computed.readOnly('formView.formSubmitted'),
  iconClass: 'icon-delete',
  layout: layout,

  actions: {
    destroy: function() {
      this.get('formView').send('destroy');
    }
  },
});
