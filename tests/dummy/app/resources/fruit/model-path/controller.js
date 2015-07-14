import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.Controller.extend(
  FormMixin, {

  model: {
    fruit: {
      name: null
    }
  },

});
