import Ember from 'ember';
import layout from '../templates/components/form-wrapper';

const { computed } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['novalidate'],
  className: 'form',
  classNameBindings: ['className'],
  layout: layout,
  novalidate: true,
  tagName: 'form',

  actions: {

    cancel() {
      this.sendAction();
    },

    destroy() {
      this.sendAction();
    },

    submit() {
      this.sendAction();
    },

  },

  /* A shim to enabled use with controller and components
  moving forward */

  formController: Ember.computed(function() {
    const routeController = this.get('_controller');

    if (this.get('isFormController')) {
      return this;
    } else if (routeController.get('isFormController')) {
      return routeController;
    } else {
      return null;
    }
  }),
});
