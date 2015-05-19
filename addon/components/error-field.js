import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/error-field';
import toWords from '../utils/to-words';
import WalkViews from '../mixins/views/walk-views';

export default Ember.Component.extend(
  WalkViews, {

  shouldShowError: true,
  classNameBindings: ['easyForm.errorClass', 'errorIsVisible:visible'],
  error: null,
  label: Ember.computed.oneWay('property'),
  layout: layout,
  property: null,
  tagName: 'span',

  errorIsVisible: Ember.computed('shouldShowError', 'error',
    function() {
      return this.get('shouldShowError') && !!this.get('error');
    }
  ),

  text: Ember.computed('errors.[]', 'value', function() {
    var propertyName = defaultFor(
      this.get('property'),
      this.get('parentView.property')
    );

    return toWords(propertyName) + ' ' + this.get('error');
  }),

  addErrorObserver: Ember.on('init', function() {
    var property = this.get('property');
    var controller, errorPath, setError;

    if (property) {
      controller = this.get('formView.controller');
      errorPath = 'errors.' + property + '.firstObject';

      setError = function() {
        var error = controller.get(errorPath);
        var parentView = this.get('parentView');
        var isValid = !error && parentView.get('isInputGroup');

        parentView.set('isValid', isValid);
        this.set('error', controller.get(errorPath));
      };

      // TODO - Remove observer?
      controller.addObserver(errorPath, this, setError);
    }
  })
});
