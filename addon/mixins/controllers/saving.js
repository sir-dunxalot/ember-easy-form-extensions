import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Mixin.create(
  EmberValidations.Mixin, {

  formSubmitted: false,
  destroySubmitted: false,
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

    if (_this.runCustomValidations) {
      Ember.warn('If your custom validations method has a reject method, remember to set the controller\'s isValid property to false when the form content is invalid');

      _this.runCustomValidations();
    }

    if (!_this.get('isValid')) {
      _this.set('formSubmitted', false);

      return false;
    } else {
      Ember.assert('You need to specify a save method on this controller', this.save);

      this.save();
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
