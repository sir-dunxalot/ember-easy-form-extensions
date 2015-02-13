import Ember from 'ember';

export default Ember.Component.extend(
  Ember.ViewTargetActionSupport, {

  attributeBindings: ['dataTest:data-test'],
  classNameBindings: ['destroySubmitted:button:button-primary'],
  destroyText: 'Delete',
  iconClass: 'icon-delete',
  tagName: 'button',
  dataTest: 'destroy',

  click: function() {
    this.triggerAction({
      action: 'destroy',
      target: this.get('parentView'),
    });
  },

  destroySubmitted: function() {
    var page = this.get('parentView');
    var controller = page.get('controller');
    var formSubmitted = controller.get('formSubmitted');

    return formSubmitted;
  }.property('parentView.controller.formSubmitted'),
});
