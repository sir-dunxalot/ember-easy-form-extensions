import Ember from 'ember';
import layout from '../templates/components/error-field';
import toWords from '../utils/to-words';

const { computed, on } = Ember;

export default Ember.Component.extend({
  shouldShowError: true,
  className: 'error',
  classNameBindings: ['className', 'errorIsVisible:visible'],
  error: null,
  errorIsVisible: computed.and('shouldShowError', 'error'),
  label: computed.oneWay('property'),
  layout: layout,
  property: null,
  tagName: 'span',

  text: computed('error', 'property', function() {
    const { error, property } = this.getProperties(
      [ 'error', 'property' ]
    );
    const cleanProperty = toWords(property);

    return `${cleanProperty} ${error}`;
  }),

  addErrorObserver: on('init', function() {
    const property = this.get('property');

    function setError() {
      const error = controller.get(errorPath);

      parentView.set('isValid', !error);

      this.set('error', controller.get(errorPath));
    }

    if (property) {
      const controller = this.nearestWithProperty('isFormController');
      const errorPath = `errors.${property}.firstObject`;

      // TODO - Remove observer?
      controller.addObserver(errorPath, this, setError);
    }
  })
});
