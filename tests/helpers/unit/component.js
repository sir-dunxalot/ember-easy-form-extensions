import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

const { run } = Ember;

export function setOnController(component, properties) {
  run(function() {
    component.get('formController').setProperties(properties);
  });
}

export function destroy(component) {
  run(function() {
    component.destroy();
  });
}

export function initAttrs(component) {
  run(function() {
    component.trigger('didInitAttrs');
  });
}

export function setupComponent(context) {
  return context.subject({
    formController: Ember.Controller.createWithMixins(FormMixin),
  });
}
