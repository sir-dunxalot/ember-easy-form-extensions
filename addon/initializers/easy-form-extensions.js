import Ember from 'ember';

export function initialize() {

  Ember.Checkbox.reopen({
    attributeBindings: [
      'checked:aria-checked',
    ],
  });

  Ember.TextArea.reopen({
    attributeBindings: [
      'invalid:aria-invalid',
      'required:aria-required',
    ],
  });

  Ember.TextField.reopen({
    attributeBindings: [
      'invalid:aria-invalid',
      'required:aria-required',
    ],
  });

  Ember.Select.reopen({
    attributeBindings: [
      'invalid:aria-invalid',
      'required:aria-required',
    ],
  });
}

export default {
  name: 'easy-form-extensions',
  initialize: initialize
};
