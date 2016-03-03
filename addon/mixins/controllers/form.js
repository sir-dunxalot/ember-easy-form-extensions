import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { computed } = Ember;

export default Ember.Mixin.create(
  EmberValidations, {

  /* Properties */

  formIsSubmitted: false,

  hasFormMixin: computed(function() {
    return true;
  }).readOnly(),

  /* Actions */

  actions: {

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

    save() {
      this.set('formIsSubmitted', true);
      this._eventHandler('save');
    },

  },

  /* Methods */

  // resetForm: on('routeDidTransition', function() {
  //   this.resetSubmission();

  //   /* Add logic for resetting anything to do with
  //   input here */
  // }),

  resetSubmission() {
    this.set('formIsSubmitted', false);
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
    const capitalizedType = Ember.String.capitalize(type);
    const handlerMethodName = `before${capitalizedType}`;
    const handler = this[handlerMethodName];

    function isFunction(key) {
      return Ember.typeOf(key) === 'function';
    }

    /* If event is save, method is renamed */

    if (type === 'save') {
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
