import Ember from 'ember';
import insert from 'ember-easy-form-extensions/utils/computed/insert';

/* Import helpers */

import form from 'ember-easy-form-extensions/helpers/form';
import formControls from 'ember-easy-form-extensions/helpers/form-controls';

export function initialize(/* container, app */) {
  var EasyForm = Ember.EasyForm;
  var Handlebars = Ember.Handlebars;
  var run = Ember.run;

  /* Register helpers */

  Handlebars.registerHelper('form', form);
  Handlebars.registerHelper('form-controls', formControls);

  /**
  Default option overrides
  */

  EasyForm.Config.registerWrapper('default', {
    errorClass: 'error',
    formClass: 'form',
    fieldErrorClass: 'control-error',
    hintClass: 'hint',
    inputClass: 'control',
    inputTemplate: 'easy-form/input',
    labelClass: 'label',
  });

  EasyForm.Checkbox.reopen({
    classNames: ['input-checkbox'],
  });

  EasyForm.TextField.reopen({
    attributeBindings: ['dataTest:data-test'],
    classNames: ['input'],
    dataTest: Ember.computed.alias('parentView.dataTest'),
  });

  EasyForm.TextArea.reopen({
    attributeBindings: ['dataTest:data-test'],
    classNames: ['input-textarea'],
    dataTest: Ember.computed.alias('parentView.dataTest'),
  });

  /**
  Overrides the original `errorText` property to add the property name to the error message. For example:

  can't be blank --> Name can't be blank
  must be a number --> Age must be a number

  If a label is specified on the input, this will be used in place of the property name.
  */

  EasyForm.Error.reopen({
    errorText: function() {
      var propertyName = this.get('parentView.label') || this.get('property') || '';

      return EasyForm.humanize(propertyName) + ' ' + this.get('errors.firstObject');
    }.property('errors.[]', 'value'),
  });

  /**
  Temporarily binds a success class the the control when the input goes from invalid to valid.
  */

  EasyForm.Input.reopen({
    classNameBindings: ['showValidity:input_with_validity'],
    datepickerInputId: insert('elementId', 'input-{{value}}'),
    isDatepicker: Ember.computed.equal('as', 'date'),
    showValidity: false,

    setInvalidToValid: function() {
      // If we go from error to no error
      if (!this.get('showError') && this.get('canShowValidationError')) {
        run.debounce(this, function() {
          var hasAnError = this.get('formForModel.errors.' + this.get('property') + '.length');

          if (!hasAnError && !this.get('isDestroying')) {
            this.set('showValidity', true);

            run.later(this, function() {
              if (!this.get('isDestroying')) {
                this.set('showValidity', false);
              }
            }, 2000);
          }
        }, 50);
      }
    }.observes('showError'),

    /**
    An override of easyForm's default `focusOut` method to ensure validations are not shown when the user clicks cancel.

    @method focusOut
    */

    focusOut: function() {

      /* Hacky - delay check so focusOut runs after the cancel action */

      run.later(this, function() {
        var cancelClicked = this.get('parentView.cancelClicked');
        var isDestroying = this.get('isDestroying');

        if (!cancelClicked && !isDestroying) {
          this.set('hasFocusedOut', true);
          this.showValidationError();
        }
      }, 100);
    },

  });

}

export default {
  name: 'easy-form-extensions',
  initialize: initialize
};
