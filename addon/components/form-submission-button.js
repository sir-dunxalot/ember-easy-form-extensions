import Ember from 'ember';
import layout from '../templates/components/form-submission-button';

export default Ember.Component.extend({

  /* Options */

  action: null,
  className: 'button',
  text: null,
  type: 'button',

  /* Properties */

  attributeBindings: ['className:data-test', 'type'],
  classNameBindings: ['className'],
  layout: layout,
  tagName: 'button',

  click: function() {
    this.sendAction();
  },
});
