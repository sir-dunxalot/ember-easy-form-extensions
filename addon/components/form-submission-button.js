import Ember from 'ember';
import layout from '../templates/components/form-submission-button';

export default Ember.Component.extend({

  /* Options */

  action: null,
  className: 'button',
  disabled: false,
  text: null,
  type: 'button',

  /* Properties */

  attributeBindings: ['disabled', 'type'],
  classNameBindings: ['className'],
  layout: layout,
  tagName: 'button',

  /* Methods */

  click: function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.get('disabled')) {
      this.sendAction();
    }
  },

});
