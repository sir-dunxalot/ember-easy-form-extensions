import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Mixin.create(
  EmberValidations.Mixin, {

  formSubmitted: false,
  revalidateFor: [],

  forEachRevalidator: function(callback) {
    var revalidateFor = this.get('revalidateFor');

    if (revalidateFor.get('length')) {
      revalidateFor.forEach(function(property) {
        callback(property);
      });
    }
  },

  editingModel: Ember.computed(function() {
    return this.toString().indexOf('/edit:') > -1;
  }),

  newModel: Ember.computed(function() {
    return this.toString().indexOf('/new:') > -1;
  }),

  showServerError: function(/* xhr */) {
    this.set('formSubmitted', false);
  },

  validateAndSave: function() {
    var _this = this;
    var customValidationsPromise;

    var resolve = function() {
      Ember.assert(
        'You need to specify a save method on this controller',
        typeof _this.save === 'function'
      );

      _this.save();
    };

    var reject = function() {
      _this.set('formSubmitted', false);
    };

    /* If there is a custom validations method, resolve it */

    if (this.runCustomValidations) {
      customValidationsPromise = this.runCustomValidations();

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
  _revalidate: Ember.on('routeDidTransition',
    function() {
      var _this = this;

      _this.forEachRevalidator(function(property) {
        _this.addObserver(property, _this.validate);
      });
    }
  ),

  _removeRevalidationObservers: Ember.on('routeWillTransition',
    function() {
      var _this = this;

      _this.forEachRevalidator(function(property) {
        _this.removeObserver(property, _this.validate);
      });
    }
  ),

});
