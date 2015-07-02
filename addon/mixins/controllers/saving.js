import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { computed, on } = Ember;

export default Ember.Mixin.create(
  EmberValidations.Mixin, {

  formSubmitted: false,
  revalidateFor: [],

  forEachRevalidator(callback) {
    var revalidateFor = this.get('revalidateFor');

    if (revalidateFor.length) {
      revalidateFor.forEach(function(property) {
        callback(property);
      });
    }
  },

  editingModel: computed(function() {
    return this.toString().indexOf('/edit:') > -1;
  }),

  newModel: computed(function() {
    return this.toString().indexOf('/new:') > -1;
  }),

  showServerError(/* xhr */) {
    this.set('formSubmitted', false);
  },

  validateAndSave() {
    const _this = this;

    function resolve() {
      Ember.assert(
        'You need to specify a save method on this controller',
        typeof _this.save === 'function'
      );

      _this.save();
    };

    function reject() {
      _this.set('formSubmitted', false);
    };

    /* If there is a custom validations method, resolve it */

    if (this.runCustomValidations) {
      const customValidationsPromise = this.runCustomValidations();

      if (!customValidationsPromise.then) {
        Ember.assert(
          'runCustomValidations() must return a promise (e.g. return new Ember.RSVP.Promise(...)).'
        );
      }

      customValidationsPromise.then(resolve, reject);
    } else {

      /* Else save with normal ember-validations checks */

      if (!_this.get('isValid')) {
        reject();
      } else {
        resolve();
      }

    }
  },

  // TODO - add observes revalidateFor.[]
  _revalidate: on('routeDidTransition',
    function() {
      this.forEachRevalidator(function(property) {
        this.addObserver(property, this.validate);
      }.bind(this));
    }
  ),

  _removeRevalidationObservers: on('routeWillTransition',
    function() {
      this.forEachRevalidator(function(property) {
        this.removeObserver(property, this.validate);
      }.bind(this));
    }
  ),

});
