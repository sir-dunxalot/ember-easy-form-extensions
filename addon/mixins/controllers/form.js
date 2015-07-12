import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { computed, on } = Ember;

export default Ember.Mixin.create(
  EmberValidations.Mixin, {

  /* Properties */

  formIsSubmitted: false,

  editing: computed(function() {
    return this.toString().indexOf('/edit:') > -1;
  }),

  hasFormMixin: computed(function() {
    return true;
  }).readOnly(),

  new: computed(function() {
    return this.toString().indexOf('/new:') > -1;
  }),

  /* Actions */

  actions: {

    /* Actions for child input groups */

    registerInputGroup(inputGroupComponent) {
      this.on('submission', function() {
        inputGroupComponent.send('showError');
      });
    },

    unregisterInputGroup(inputGroupComponent) {
      this.off('submission', function() {
        inputGroupComponent.send('showError');
      });
    },

    /* Form submission actions */

    cancel() {
      this.set('formIsSubmitted', true);
      this._eventHandler('cancel');
    },

    delete() {
      this.set('formIsSubmitted', true);
      this._eventHandler('delete');
    },

    /* Show validation errors on submit click */

    submit() {
      this.set('formIsSubmitted', true);
      this.trigger('submission');
      this._eventHandler('submit');
    },

  },

  /* Methods */

  resetForm: on('routeDidTransition', function() {
    this.resetSubmission();

    /* Add logic for resetting anything to do with
    input here */
  }),

  resetSubmission() {
    this.set('formIsSubmitted', false);
  },

  showServerError(/* xhr */) {
    this.resetSubmission();
  },

  validateThenSave() {
    const _this = this;

    function resolve() {
      Ember.assert(
        'You need to specify a save method on this controller',
        typeof _this.save === 'function'
      );

      _this.save();
    }

    function reject() {
      _this.set('formIsSubmitted', false);
    }

    /* If there is a custom validations method, resolve it */

    if (this.runCustomValidations) {
      const customValidationsPromise = this.runCustomValidations();

      if (!customValidationsPromise || !customValidationsPromise.then) {
        Ember.assert(
          'runCustomValidations() must return a promise (e.g. return new Ember.RSVP.Promise(...)).'
        );
      }

      customValidationsPromise.then(resolve, reject);
    } else {

      /* Else save with normal ember-validations checks */

      if (!this.get('isValid')) {
        reject();
      } else {
        resolve();
      }

    }
  },

  /* Private methods */

  _eventHandler(type) {
    const handlerMethodName = `${type}Handler`;
    const handler = this[handlerMethodName];

    function isFunction(key) {
      return Ember.typeOf(key) === 'function';
    }

    /* If event is submit, method is renamed */

    if (type === 'submit') {
      type = 'validateThenSave';
    }

    const method = this[type];

    Ember.assert(`You need to specify a ${type} method on this controller`, method && isFunction(method));

    /* If handler exists, resolve the promise then call
    the method... */

    if (handler) {
      Ember.assert(`${handlerMethodName}() must be a function`, isFunction(handler));

      const handlerPromise = handler();

      if (!handlerPromise.then) {
        Ember.assert('handler() must return a promise (e.g. return new Ember.RSVP.Promise(...))');
      }

      handlerPromise.then(function() {
        this[type]();
      }.bind(this));

    /* ...Else, just call the method */

    } else {
      this[type]();
    }

  },

});
