import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/components/form';

export default Ember.Mixin.create(
  FormMixin, {

  init() {
    this._super(...arguments);

    Ember.deprecate('mixins/controllers/form.js has been deprecated in favor of mixins/components/form.js');
  },

});
