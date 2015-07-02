import Ember from 'ember';
import layout from '../templates/components/form-wrapper';

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
});
