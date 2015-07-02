import Ember from 'ember';
import WalkViews from 'ember-easy-form-extensions/mixins/views/walk-views';
import layout from '../templates/components/destroy-submission';

const { computed } = Ember;

export default Ember.Component.extend(
  WalkViews, {

  classNames: ['buttons'],
  destroyText: 'Delete',
  formSubmitted: computed.readOnly('formView.formSubmitted'),
  iconClass: 'icon-delete',
  layout: layout,

  actions: {
    destroy() {
      this.get('formView').send('destroy');
    }
  },
});
