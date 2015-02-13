Ember.EasyForm.Config.registerTemplate('easyForm/input', Ember.Handlebars.compile(
  '{{label-field propertyBinding="view.property" textBinding="view.label"}}' +
  '<div class="input_wrapper">' +
  '{{#if view.isDatepicker}}' +
    '{{input id=view.datepickerInputId class="datepicker input"}}' +
  '{{/if}}' +
    '{{partial "easyForm/inputControls"}}' +
  '</div>'
));

/**
Default option overrides
*/

Ember.EasyForm.Config.registerWrapper('default', {
  errorClass: 'error',
  formClass: 'form',
  fieldErrorClass: 'input_with_errors',
  hintClass: 'hint',
  inputClass: 'control',
  labelClass: 'label',
});

Ember.EasyForm.Checkbox.reopen({
  classNames: ['input-checkbox'],
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
  classNameBindings: ['showValidity:input_with_validity'],
  datepickerInputId: insert('elementId', 'input-{{value}}'),
  isDatepicker: Em.computed.equal('as', 'date'),
  showValidity: false,

  setInvalidToValid: function() {
    // If we go from error to no error
    if (!this.get('showError') && this.get('canShowValidationError')) {
      Ember.run.debounce(this, function() {
        var hasAnError = this.get('formForModel.errors.' + this.get('property') + '.length');

        if (!hasAnError && !this.get('isDestroying')) {
          this.set('showValidity', true);

          Ember.run.later(this, function() {
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
    // Double run loop so `cancelClick` is set properly
    Ember.run.next(this, function() {
      Ember.run.next(this, function() {
        if (!this.get('parentView.cancelClicked') && !this.get('isDestroying')) {
          this.set('hasFocusedOut', true);
          this.showValidationError();
        }
      });
    });
  },

});
