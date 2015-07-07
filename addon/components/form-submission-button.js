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

  attributeBindings: ['className:data-test', 'disabled', 'type'],
  classNameBindings: ['className'],
  layout: layout,
  tagName: 'button',

  click: function(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('here');

    this.sendAction();
  },
});
