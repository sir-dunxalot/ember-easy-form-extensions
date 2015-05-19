import Ember from 'ember';

export function initialize(container, app) {

  Ember.Checkbox.reopen({
    attributeBindings: [
      'checked:aria-checked',
      'dataTest:data-test'
    ],
  });

  Ember.TextArea.reopen({
    attributeBindings: [
      'dataTest:data-test',
      'invalid:aria-invalid',
      'required:aria-required',
    ],
  });

  Ember.TextField.reopen({
    attributeBindings: [
      'dataTest:data-test',
      'invalid:aria-invalid',
      'required:aria-required',
    ],
  });

  Ember.Select.reopen({
    attributeBindings: [
      'dataTest:data-test',
      'invalid:aria-invalid',
      'required:aria-required',
    ],
  });

  app.inject('component', 'easyForm', 'service:easy-form');
}

export default {
  name: 'easy-form',
  initialize: initialize
};
