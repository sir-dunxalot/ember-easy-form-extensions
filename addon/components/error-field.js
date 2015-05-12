import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/error-field';
import toWords from '../utils/to-words';
import WalkViews from '../mixins/views/walk-views';

export default Ember.Component.extend(
  WalkViews, {

  classNameBindings: ['easyForm.errorClass'],
  error: null,
  label: Ember.computed.oneWay('property'),
  layout: layout,
  property: null,
  tagName: 'span',

  text: Ember.computed('errors.[]', 'value', function() {
    var propertyName = defaultFor(
      this.get('property'),
      this.get('parentView.property')
    );

    return toWords(propertyName) + ' ' + this.get('error');
  }),

  addErrorObserver: Ember.on('init', function() {
    var fullPropertyPath = this.get('parentView.fullPropertyPath');
    var controller, errorPath, setError;

    if (fullPropertyPath) {
      controller = this.get('formView.controller');

      errorPath = 'errors.' + fullPropertyPath + '.firstObject';

      setError = function() {
        this.set('error', controller.get(errorPath));
      };

      // TODO - Remove observer?
      controller.addObserver(errorPath, this, setError);
    }
  })
});
