import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

const { run } = Ember;

export function setPropertiesOnController(component, properties) {
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

export function renderingTests(assert, context, component) {

  assert.equal(component._state, 'preRender',
    'The component instance should be created');

  context.render();

  assert.equal(component._state, 'inDOM',
    'The component should be inserted into the DOM after render');

}

export function setOnComponent(component, key, value) {
  run(function() {
    component.set(key, value);
  });
}

export function setPropertiesOnComponent(component, properties) {
  run(function() {
    component.setProperties(properties);
  });
}

export function setupComponent(context) {
  return context.subject({
    formController: Ember.Controller.createWithMixins(FormMixin),
  });
}
