import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

const { run } = Ember;

export function testClassNameBinding(assert, component) {

  Ember.assert(
    'No element was found for the component. You must call this.render() before testClassNameBinding. Perhaps you forgot to pass assert as the first param?',
    component && component.$()
  );

  assertClass(assert, component, component.get('className'));

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

export function sendAction(component, action) {
  run(function() {
    component.send(action);
  });
}

export function setOnComponent(component, key, value) {
  run(function() {
    component.set(key, value);
  });
}

export function setOnController(component, key, value) {
  const formController = component.get('formController');

  Ember.assert('No formController was found on the component. You must use setupComponent() in the beforeEach hook', formController);

  run(function() {
    component.set(`formController.${key}`, value);
  });
}

export function setPropertiesOnComponent(component, properties) {
  run(function() {
    component.setProperties(properties);
  });
}

export function setPropertiesOnController(component, properties) {
  const formController = component.get('formController');

  Ember.assert('No formController was found on the component. You must use setupComponent() in the beforeEach hook', formController);

  run(function() {
    component.get('formController').setProperties(properties);
  });
}

export function setupComponent(context, options) {
  let componentProperties = {
    formController: Ember.Controller.createWithMixins(FormMixin),
  };

  if (options) {
    componentProperties = Ember.merge(componentProperties, options);
  }

  return context.subject(componentProperties);
}

export function assertClass(assert, component, expectedClassName) {

  Ember.assert('No element was found for the component. You must call this.render() before testClassNameBinding', component.$());

  assert.ok(component.$().hasClass(expectedClassName),
    `The ${expectedClassName} class should be bound on the element`);

}
