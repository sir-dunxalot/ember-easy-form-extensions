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

  editing: function() {
    return this.toString().indexOf('/edit:') > -1;
  }.property().readOnly(),

  new: function() {
    return this.toString().indexOf('/new:') > -1;
  }.property().readOnly(),

  showServerError: function(/* xhr */) {
    this.set('formSubmitted', false);
  },

  validateAndSave: function() {
    var _this = this;
    var runCustomValidations = _this.runCustomValidations;
    var save = _this.save;

    var resolve = function() {
      Ember.assert(
        'You need to specify a save method on this controller',
        save
      );

      save();
    }

    var reject = function() {
      _this.set('formSubmitted', false);
    }

    /* If there is a custom validations method, resolve it */

    if (runCustomValidations && !runCustomValidations.then) {
      Ember.assert('runCustomValidations() must return a promise (e.g. return new Ember.RSVP.Promise()).');
    } else if (runCustomValidations) {
      runCustomValidations().then(function() {
        resolve();
      }, function() {
        reject();
      });
    } else {

      /* Else save with normal ember-validations checks */

      if (!_this.get('isValid')) {
        reject();
      } else {
        resolve();
      }

    }
  },

  _revalidate: function() {
    var _this = this;

    _this.forEachRevalidator(function(property) {
      _this.addObserver(property, _this.validate);
    });
  }.observes('revalidateFor.[]').on('routeDidTransition'),

  _removeRevalidationObservers: function() {
    var _this = this;

    _this.forEachRevalidator(function(property) {
      _this.removeObserver(property, _this.validate);
    });
  }.on('routeWillTransition'),

});
