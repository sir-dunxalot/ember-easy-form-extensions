import Ember from 'ember';

export default Ember.Mixin.create({
  revalidateFor: [],

  forEachRevalidator(callback) {
    const revalidateFor = this.get('revalidateFor');

    if (revalidateFor.length) {
      revalidateFor.forEach((property) => {
        callback(property);
      });
    }
  },

  willDestroy() {
    this._super(...arguments);
    this._removeRevalidationObservers();
  },

  init() {
    this._super(...arguments);
    this._revalidate();
  },

  _revalidate() {
    const validateExists = Ember.typeOf(this.validate) === 'function';

    Ember.assert('No validate() method detected. You must use the conditional validations mixin with the form mixin.', validateExists);

    this.forEachRevalidator((property) => {
      this.addObserver(property, () => {
        this.validate();
      });
    });
  },

  _removeRevalidationObservers() {
    this.forEachRevalidator((property) => {
      this.removeObserver(property, () => {
        this.validate();
      });
    });
  },
});
