import Ember from 'ember';

var readOnly = Ember.computed.readOnly;

export default Ember.Component.extend({
  classNames: ['buttons'],
  destroyText: 'Delete',
  formSubmitted: readOnly('parentView.controller.formSubmitted'),
  iconClass: 'icon-delete',
});
