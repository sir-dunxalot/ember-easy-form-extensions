import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({
  classNameBindings: ['submissionClassName'],

  submissionClassName: computed('className', 'formIsSubmitted',
    function() {
      const className = this.get('className');
      const formIsSubmitted = this.get('formIsSubmitted');

      if (formIsSubmitted) {
        return `${className}-submitted`;
      } else {
        return null;
      }
    }
  ),
});
