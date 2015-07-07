import Ember from 'ember';

export default function(context) {
  return context.subject({
    formController: Ember.Controller.create({
      formIsSubmitted: false
    }),
  });
}
