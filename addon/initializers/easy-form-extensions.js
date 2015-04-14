import Ember from 'ember';

export function initialize(/* container, app */) {
  var run = Ember.run;

  /**
  Default option overrides
  */

  Ember.EasyForm.Config.registerWrapper('default', {
    errorClass: 'error',
    errorTemplate: 'easy-form/error',

    formClass: 'form',
    fieldErrorClass: 'control-error',

    hintClass: 'hint',
    hintTemplate: 'easy-form/hint',

    inputClass: 'control',
    inputTemplate: 'easy-form/input',

    labelClass: 'label',
    labelTemplate: 'easy-form/label'
  });

  Ember.EasyForm.Checkbox.reopen({
    attributeBindings: ['dataTest:data-test'],
    classNames: ['input-checkbox'],
    dataTest: Ember.computed.alias('parentView.dataTest'),
  });

  Ember.EasyForm.TextField.reopen({
    attributeBindings: ['dataTest:data-test'],
    classNames: ['input'],
    dataTest: Ember.computed.alias('parentView.dataTest'),
  });

  Ember.EasyForm.TextArea.reopen({
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

  Ember.EasyForm.Error.reopen({
    errorText: function() {
      var propertyName = this.get('parentView.label') || this.get('property') || '';

      return Ember.EasyForm.humanize(propertyName) + ' ' + this.get('errors.firstObject');
    }.property('errors.[]', 'value'),
  });

  /**
  Temporarily binds a success class the the control when the input goes from invalid to valid.
  */

  Ember.EasyForm.Input.reopen({
    classNameBindings: ['showValidity:control-valid'],
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
