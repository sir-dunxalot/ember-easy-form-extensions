import Ember from 'ember';

const { on, typeOf } = Ember;

export default Ember.Mixin.create({
  revalidateFor: [],

  forEachRevalidator(callback) {
    const revalidateFor = this.get('revalidateFor');

    if (revalidateFor.length) {
      revalidateFor.forEach(function(property) {
        callback(property);
      });
    }
  },

  /* TODO - update to new controller hooks with routable
  components release. At that time, deprecate the routing-events
  initializer */

  _revalidate: on('routeDidTransition',
    function() {
      const validateExists = typeOf(this.validate) === 'function';

      Ember.assert('No validate() method detected. You must use the conditional validations mixin with the form mixin.', validateExists);

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
