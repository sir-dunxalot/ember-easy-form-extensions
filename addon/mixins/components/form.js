import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { assert, computed } = Ember;

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
      this._eventHandler('cancel');
    },

    delete() {
      this._eventHandler('delete');
    },

    /* Show validation errors on submit click */

    save() {
      this._eventHandler('save');
    },

  },

  /* Methods */

  resetSubmission() {
    this.set('formIsSubmitted', false);
  },

  validateThenSave() {
    const _this = this;

    function resolve() {
      assert(
        'You need to specify a save method on this controller',
        typeof _this.save === 'function'
      );

      _this.save();
    }

    function reject() {
      _this.resetSubmission();

      if (_this.onInvalidSubmission) {
        _this.onInvalidSubmission();
      }
    }

    function checkIsValid() {
      if (!_this.get('isValid')) {
        reject();
      } else {
        resolve();
      }
    }

    /* If there is a custom validations method, resolve it */

    if (this.runCustomValidations) {
      const customValidationsPromise = this.runCustomValidations();

      if (!customValidationsPromise || !customValidationsPromise.then) {
        assert(
          'runCustomValidations() must return a promise (e.g. return new Ember.RSVP.Promise(...)).'
        );
      }

      customValidationsPromise.then(checkIsValid, reject);
    } else {

      /* Else save with normal ember-validations checks */

      checkIsValid();
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

    /* Set the form to be submitted */

    this.set('formIsSubmitted', true);

    /* If event is save, method is renamed */

    if (type === 'save') {
      type = 'validateThenSave';
    }

    const method = this[type];

    assert(`You need to specify a ${type} method on this controller`, method && isFunction(method));

    /* If handler exists, resolve the promise then call
    the method... */

    if (handler) {
      assert(`${handlerMethodName}() must be a function`, isFunction(handler));

      const handlerPromise = handler();

      if (!handlerPromise.then) {
        assert('handler() must return a promise (e.g. return new Ember.RSVP.Promise(...))');
      }

      handlerPromise.then(() => {
        this[type]();
      });

    /* ...Else, just call the method */

    } else {
      this[type]();
    }

  },

});
