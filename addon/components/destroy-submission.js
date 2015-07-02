import Ember from 'ember';
import layout from '../templates/components/destroy-submission';

const { computed } = Ember;

export default Ember.Component.extend({
  className: 'destroy-submission',
  classNameBindings: ['className'],
  destroyText: 'Delete',
  formIsSubmitted: computed.oneWay('formController.formIsSubmitted'),
  iconClass: 'icon-delete',
  layout: layout,

  formController: computed(function() {
    return this.nearestWithProperty('isFormController');
  }),

  actions: {
    destroy() {
      this.sendAction();
    }
  },
});
