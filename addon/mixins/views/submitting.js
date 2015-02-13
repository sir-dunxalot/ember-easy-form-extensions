import Ember from 'ember';

export default Ember.Mixin.create({
  cancelClicked: false,
  destroySubmitted: Ember.computed.alias('controller.destroySubmitted'),
  formSubmitted: Ember.computed.alias('controller.formSubmitted'),

  actions: {

    cancel: function() {
      this.setProperties({
        cancelClicked: true,
        formSubmitted: true
      });

      this._eventHandler('cancel');
    },

    destroy: function() {
      this.setProperties({
        formSubmitted: true,
        destroySubmitted: true,
      });

      this._eventHandler('destroy');
    },

  },

  /* Show validation errors on submit click */

  submit: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.set('formSubmitted', true);

    this.get('childViews').forEach(function(view) {
      var viewConstructor = view.get('constructor').toString();

      if (viewConstructor === 'Ember.EasyForm.Input') {
        view.focusOut();
      }
    });

    this._eventHandler('submit');
  },

  resetForm: function() {
    this.setProperties({
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

  /* Private methods */

  _eventHandler: function(type) {
    var controller = this.get('controller');
    var methodName = type + 'Handler';
    var handler = this[methodName];
    var controllerMethod;

    if (handler) {
      Ember.assert(
        methodName + '() must be a function',
        Ember.typeOf(handler) === 'function'
      );
    }

    /* If handler is not a promise */

    if (handler && !handler.then) {
      Ember.assert(methodName + '() must return a promise (e.g. return new Ember.RSVP.Promise()).');

    } else {

      /* If event is submit, controller method is renamed */

      type = type === 'submit' ? 'validateAndSave' : type;
      controllerMethod = controller[type];

      Ember.assert(
        'You need to specify a cancel method on this view\'s controller',
        controllerMethod && Ember.typeOf(controllerMethod) === 'function'
      );

      /* Don't use controller[type] variable so we keep scope */

      /* Else, if handler exists, resolve the promise then call
      the method on the controller */

      if (handler && handler.then) {
        handler().then(function() {
          controller[type]();
        });

      /* Else, just call the method on the controller */

      } else {
        controller[type]();
      }
    }
  },

});
