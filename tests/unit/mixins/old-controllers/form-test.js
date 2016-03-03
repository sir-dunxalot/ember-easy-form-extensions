// import Ember from 'ember';
// import ControllersFormMixin from 'ember-easy-form-extensions/mixins/controllers/form';
// import { module, test } from 'qunit';

// const supportedButtons = ['cancel', 'delete', 'save'];
// const { run, typeOf } = Ember;

// let component;

// function set(key, value) {
//   run(function() {
//     component.set(key, value);
//   });
// }

// function setProperties(properties) {
//   run(function() {
//     component.setProperties(properties);
//   });
// }

// function trigger(event) {
//   run(function() {
//     component.trigger(event);
//   });
// }

// module('Unit | Mixin | controllers/form', {

//   beforeEach: function() {

//     const ControllersFormMixinObject = Ember.Component.extend(
//       ControllersFormMixin,
//       Ember.Evented, {

//       cancel: function() {
//         Ember.warn("It looks like you forgot to set cancel() with an assertion in your test. For example controller.set('cancel', function() { assert.ok(...) });");
//       },

//       delete: function() {
//         Ember.warn("It looks like you forgot to set delete() with an assertion in your test. For example controller.set('delete', function() { assert.ok(...) });");
//       },

//       save: function() {
//         Ember.warn("It looks like you forgot to set save() with an assertion in your test. For example controller.set('save', function() { assert.ok(...) });");
//       },

//     });

//     component = ControllersFormMixinObject.create();
//   },
// });

// test('Properties and actions', function(assert) {

//   assert.strictEqual(component.get('formIsSubmitted'), false,
//     'Form is submitted should default to false');

//   assert.ok(component.get('hasFormMixin'),
//     'The mixin should have a helper property for detection by components');

//   supportedButtons.forEach(function(action) {

//     assert.ok(component.get(`_actions.${action}`),
//       `The ${action} action should exist`);

//   });

// });

// test('Public methods', function(assert) {
//   const done = assert.async();

//   assert.expect(7);

//   /* Check public methods exist */

//   [
//     'resetForm',
//     'resetSubmission',
//     'showServerError',
//     'validateThenSave'
//   ].forEach(function(publicMethod) {

//     assert.ok(typeOf(component.get(publicMethod)) === 'function',
//       `${publicMethod} should be a public method`);

//   });

//   /* resetForm() */

//   set('formIsSubmitted', true);

//   component.resetForm();

//   assert.strictEqual(component.get('formIsSubmitted'), false,
//     'Form is submitted should be set to false after calling resetForm');

//   /* validateThenSave() */

//   set('runCustomValidations', function() {
//     return new Ember.RSVP.Promise(function(resolve) {

//       assert.ok(true,
//         'runCustomValidations should be called by validateThenSave');

//       resolve();

//     });
//   });

//   set('save', function() {

//     assert.ok(true,
//       'save() should be called by validateThenSave()');

//     done();

//   });

//   component.validateThenSave();

// });

// test('Private methods', function(assert) {

//   /* _eventHandler */

//   const events = supportedButtons;

//   /* Use an array and index to save and call assert.async()
//   methods so we can wait for the promises to resolve before
//   ending the test */

//   const waiters = [];

//   let doneCount = 0;

//   assert.expect(9);

//   /* Test without event handlers... */

//   events.forEach(function(event) {
//     const eventHandler = `${event}Handler`;

//     let method = event;

//     if (event === 'save') {
//       method = 'validateThenSave';
//     }

//     set(method, function() {

//       assert.ok(true,
//         `${method}() should be called by _eventHandler()`);

//     });

//     component._eventHandler(event);

//   });

//   /* ... Then test event handlers */

//   events.forEach(function(event) {
//     const capitalizedEvent = Ember.String.capitalize(event);
//     const eventHandler = `before${capitalizedEvent}`;

//     let method = event;

//     if (event === 'save') {
//       method = 'validateThenSave';
//     }

//     waiters.push(assert.async());

//     set(eventHandler, function() {
//       return new Ember.RSVP.Promise(function(resolve) {

//         assert.ok(true,
//           '${eventHandler}() should be called by _eventHandler()');

//         resolve();

//       });
//     });

//     set(method, function() {

//       assert.ok(true,
//         `${method}() should be called by _eventHandler()`);

//       waiters[doneCount]();

//       doneCount++;
//     });

//     component._eventHandler(event);

//   });

// });
