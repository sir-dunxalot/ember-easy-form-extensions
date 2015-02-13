import Ember from 'ember';

export default Ember.Mixin.create({
  cancelClicked: false,

  actions: {

    cancel: function() {
      var controller = this.get('controller');

      this.set('cancelClicked', true);
      controller.set('formSubmitted', true);

      if (this.cancelHandler) {
        Ember.warn('Remember to set the controller\'s formSubmitted property to false when using a custom cancelHandler() method');
        this.cancelHandler();
      } else {
        Ember.assert('You need to specify a cancel method on this view\'s controller', controller.cancel);
        controller.cancel();
      }
    },

    destroy: function() {
      var controller = this.get('controller');

      controller.setProperties({
        formSubmitted: true,
        destroySubmitted: true,
      });

      if (this.destroyHandler) {
        this.destroyHandler();
      } else {
        Ember.assert('You need to specify a destroy method on this view\'s controller', controller.destroy);
        controller.destroy();
      }
    },
  },

  submit: function(event) {
    event.preventDefault();
    event.stopPropagation();

    var controller = this.get('controller');

    this.get('childViews').forEach(function(view) {
      if (view.get('constructor').toString() === 'Ember.EasyForm.Input') {
        view.focusOut();
      }
    });

    controller.set('formSubmitted', true);

    if (this.submitHandler) {
      this.submitHandler();
    } else {
      controller.validateAndSave();
    }
  },

  resetForm: function() {
    var controller = this.get('controller');

    controller.setProperties({
      formSubmitted: false,
      destroySubmitted: false,
    });
  }.on('willInsertElement'),

  autofocus: function() {
    var input = this.$().find('input').first();

    if (!Ember.$(input).hasClass('datepicker')) {
      input.focus();
    }
  }.on('didInsertElement'),

});
