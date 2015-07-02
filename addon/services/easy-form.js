import Ember from 'ember';

export default Ember.Service.extend({
  errorClass: 'error',
  hintClass: 'hint',
  inputClass: 'input',
  inputGroupClass: 'input-wrapper',
  formWrapperClass: 'form',
  formControlsClass: 'controls',

  inputTypePartials: {
    checkbox: 'form-inputs/checkbox',
    select: 'form-inputs/select',
    textarea: 'form-inputs/textarea',
  }
});
