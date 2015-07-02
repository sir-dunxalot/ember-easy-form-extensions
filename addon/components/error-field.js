import Ember from 'ember';
import WalkViews from '../mixins/views/walk-views';
import defaultFor from '../utils/default-for';
import layout from '../templates/components/error-field';
import toWords from '../utils/to-words';

const { computed } = Ember;

export default Ember.Component.extend(
  WalkViews, {

  shouldShowError: true,
  classNameBindings: ['easyForm.errorClass', 'errorIsVisible:visible'],
  error: null,
  label: computed.oneWay('property'),
  layout: layout,
  property: null,
  tagName: 'span',

  errorIsVisible: computed('shouldShowError', 'error', function() {
    return this.get('shouldShowError') && !!this.get('error');
  }),

  text: computed('errors.[]', 'value', function() {
    const propertyName = defaultFor(
      this.get('property'),
      this.get('parentView.property')
    );

    return toWords(propertyName) + ' ' + this.get('error');
  }),

  addErrorObserver: Ember.on('init', function() {
    const property = this.get('property');

    if (property) {
      const controller = this.get('formView.controller');
      const errorPath = `errors.${property}.firstObject`;

      function setError() {
        var error = controller.get(errorPath);
        var parentView = this.get('parentView');
        var isValid = !error && parentView.get('isInputWrapper');

        parentView.set('isValid', isValid);

        this.set('error', controller.get(errorPath));
      };

      // TODO - Remove observer?
      controller.addObserver(errorPath, this, setError);
    }
  })
});
