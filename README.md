# Ember Easy Form Extensions

This addon extends Ember EasyForm into the view and controller layers of your Ember CLI app to provide easy event and action handling using mixins and components. The newly accessible developer-friendly layer includes form submission handlers, components, and integration with ember-validations.

**This is also the easiest known way to use Easy Form with Ember 1.10 and HTMLBars.**

## Installation

Uninstall any references to `ember-easy-form` and `ember-validations`. Then:

```
ember install:addon ember-easy-form-extensions
```

## Overview and Example

`ember-easy-form-extensions` comes prepackaged with `ember-easy-form` and `ember-validations` so you can now build awesome forms and handle the subsequent submission events just as easily as Easy Form makes writing your templates.

The below code works out of the box but is also very customizable and extendible.

```hbs
{{!--app-name/templates/posts/new.hbs--}}

{{#form-wrapper}}
  {{#form-controls legend='Write a new post'}}
    {{input title}}
    {{input description as='text'}}
  {{/form-controls}}

  {{form-submission}}
{{/form-wrapper}}
```

```js
// app-name/views/posts/new.js

import Ember from 'ember';
import Submitting from 'ember-easy-form-extensions/mixins/views/submitting';

export default Ember.View.extend(
  Submitting, {

});
```

```js
// app-name/controllers/posts/new.js

import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  // Validations run out of the box
  validations: {
    title: {
      presence: true
    }
  }

  cancel: function() {
    this.transitionTo('posts');
  },

  save: function() {
    // Validations have already been run by the Saving mixin
    this.get('content').save().then(function(post) {
      this.transitionTo('post', post);
    });
  },

});
```

# Documentation

- [Mixins](#mixins)
- [Components](#components)
- [Templating](#templating)

## Mixins

The core functionality added by `ember-easy-form-extensions` lies in it's mixins. The mixins handle form submission events and work with the included components to make validating, saving, deleting, and cancelling, a breeze.

In most situations you will add the `Saving` mixin to your controller, the `Submitting` mixin to your view, and either `Rollback` or `DeleteRecord` to your route.

### Form Submitting (for views)

The form submitting mixin is intended to be mixed into **views** to handle  `cancel`, `save`, and `destroy` (aka delete) events. This mixin works in parallel with the included [components](#components).

If you don't specify custom event handlers, the events will be routed directly to the controller.

This mixin also takes care of hiding buttons after submission to enhance the usability of your forms.

```js
// app-name/views/posts/new.js

import Ember from 'ember';
import Submitting from 'ember-easy-form-extensions/mixins/views/submitting';

export default Ember.View.extend(
  Submitting, {

});
```

If you want to add custom handling for the events, you can add `submitHandler()`, `cancelHandler()`, and `destroyHandler()` to your view to handle the respective events. **Each handler should return a promise.**

```js
// app-name/views/posts/new.js

import Ember from 'ember';
import Submitting from 'ember-easy-form-extensions/mixins/views/submitting';

export default Ember.View.extend(
  Submitting, {

  submitHandler: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // Do something unusual here, then resolve.

      this.showCoolAnimation();

      if (!this.get('someViewProperty')) {
        reject(); // Resets the form submission state
      } else {
        resolve(); // Will call the controller method
      }
    });
  }

});
```

### Form Saving (for controllers)

The form saving mixin is intended to be mixed into **controllers**. Once added, the events handled in your view will automatically validate your model against the controller's validations object (powered by [ember-validations](https://github.com/dockyard/ember-validations)).

In most use cases, you should add a `save()` and `cancel()` method to the controller:

```js
// app-name/controllers/posts/new.js

import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  // Validations run out of the box
  validations: {
    title: {
      presence: true
    }
  },

  cancel: function() {
    this.transitionTo('posts');
  },

  save: function() {
    // Validations have already been run by the Saving mixin
    this.get('content').save().then(function(post) {
      this.transitionTo('post', post);
    });
  },

});
```

The saving mixin will handle all internals including the state of the form (submitted or not submitted) and running the validations - you just have to specify what you want to happen when validations have been run.

You can also add a destroy method:

```js
// app-name/controllers/post/edit.js

import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  destroy: function() {
    var _this = this;

    // Runs when the user clicks on the destroy submission component after the view has handled the destroy action and checked to see if you've specified a destroyHandler in the view
    _this.get('content').destroyRecord().then(function() {
      _this.transitionToRoute('posts');
    });
  }

});
```

Please note, this is best used when you're deleting a persisted model, not a new one - in the latter situation consider using [the delete record mixin](#delete-record).

The `Saving` mixin also provides support for automatically revalidating your model when you're using a computed property with `ember-validations`. Just add the computed property names to the `revalidateFor` array:

```js
// app-name/controllers/posts/new.js

import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  revalidateFor: ['required'],

  // Validations run out of the box
  validations: {
    title: {
      presence: {
        if: 'required'
      }
    }
  },

  required: function() {
    return this.get('somethingElse') && !this.get('anotherThing');
  }.property('somethingElse', 'anotherThing'),

  cancel: function() {},
  save: function() {},

});
```

If your routes follow a RESTful naming convention, you can take advantage of two new **boolean** properties on the controller:
- `new` - True if the route is for a new model (e.g. `this.route('new')`)
- `editing` - True if the route is for editing a model (e.g. `this.route('edit')`)

You can use these to set the button text, for example:

```js
// app-name/controllers/posts/new.js

import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  saveButtonText: function() {
    return this.get('editing') ? 'Save' : 'Add post';
  }.property('editing'),
});
```

The `saveButtonText` could then be used in your [`{{form-submission}}` component](#form-submission).

### Rollback (for routes)

The rollback mixin is intended for use in routes where you are **editing** a model. This mixin will check to see if the model is dirty and will automatically rollback it's changes if it is. The most common reason for this to happen is the user navigates to the edit route of a resource and then clicks cancel.

```js
// app-name/routes/post/edit.js

import Ember from 'ember';
import Rollback from 'ember-easy-form-extensions/mixins/routes/rollback';

export default Ember.Route.extend(
  Rollback, {

  model: function(params) {
    return this.modelFor('post');
  }

});
```

### Delete Record (for routes)

The delete record is intended for use in routes where you are creating a **new** record. This mixin will check to see if the model is dirty and will automatically rollback it's changes if it is. The most common reason for this to happen is the user navigates to the new route of a resource and then clicks cancel.

```js
// app-name/routes/posts/new.js

import Ember from 'ember';
import DeleteRecord from 'ember-easy-form-extensions/mixins/routes/delete-record';

export default Ember.Route.extend(
  DeleteRecord, {

  model: function() {
    return this.store.createRecord('post');
  }

});
```

## Components

To extend the class of any components just import them from this addon and then export them in your app. For example:

```js
// app-name/components/form-submissison.js

import FormSubmissionComponent from 'ember-easy-form-extensions/components/form-submission';

export default FormSubmissionComponent.extend({
  // Your functionality here
  className: ['buttons-group']
  classNames: ['form_submission']
});
```

### Form Wrapper

The `{{#form-wrapper}}` component wraps your code in a `<form class="form">` tag to enable HTML5 form events. It also disables HTMl5 validations. It's pretty simple:

```hbs
{{!--app-name/templates/posts/new.hbs--}}

{{#form-wrapper}}
  {{!--Your inputs here--}}

  {{form-submission}}
{{/form-wrapper}}
```

You can use custom the base classname by passing a `className` attribute:

```hbs
{{!--app-name/templates/posts/new.hbs--}}

{{#form-wrapper className='form-static'}}
  {{!--Your inputs here--}}

  {{form-submission}}
{{/form-wrapper}}
```

Otherwise, this component work just like any other Ember component.

### Form Controls

The `{{#form-controls}}` component adds more sementicism to your templates. Use it **inside** your `{{#form-wrapper}}`:

```hbs
{{!--app-name/templates/posts/new.hbs--}}

{{#form-wrapper}}
  {{#form-controls legend='Write a new post'}}
    {{!--Your inputs here--}}
  {{/form-controls}}

  {{form-submission}}
{{/form-wrapper}}
```

Note two important things:
- `{{form-submission}}` goes **outside** the `{{#form-controls}}`
- `{{#form-controls}}` requires a `legend` attribute for accessibility


### Form Submission

The `{{form-submission}}` component adds buttons for submit/save and cancel to your form.

You can customize the text of the buttons and which buttons show by passing in options. The default values are shown below:

```hbs
{{!--app-name/templates/posts/new.hbs--}}

{{form-submission
  cancel=true {{!--Whether to show cancel button--}}
  cancelText='Cancel' {{!--Cancel button text--}}
  submit=true {{!--Whether to show submit button--}}
  submitText='Save' {{!--Submit button text--}]
}}
```

The argument can be bound easily:

```hbs
{{!--app-name/templates/posts/new.hbs--}}

{{!--saveButtonText is a property on the controller--}}
{{form-submission submitText=saveButtonText}}
```

The buttons will automatically be replaced by a [loading spinner](#loading-spinner) when the form is submitted. The form will return to it's original state if there are validation errors, etc, so the user can resubmit the form.

### Destroy Submission

The `{{destroy-submission}}` component can be used in the same template as the `{{form-submission}}` component. It is built to handle events that delete a record.

An example would be the user is on the route to edit an item but is also given to option to delete the item entirely. Whether the user clicks delete, save, or cancel, all submission buttons are disabled until the event is resolved or rejected.

You can customize the text of the button by passing in the `destroytext` option. The default value is shown below:

```hbs
{{!--app-name/templates/post/edit.hbs--}}

{{!--Slightly detached from your form UI...--}}
{{destroy-submission destroyText='Delete'}}

{{!--And somewhere later in the template...--}}
{{form-submission}}
```

#### Template customization

To customize the template, just override the path at `app-name/templates/components/destroy-submission.hbs` - easy!

### Loading Spinner

The loading spinner component replaces the buttons in your submission components when the form has been submitted.

If you already have a spinner component simply export it at the correct path to immediately use your component:

```js
// app-name/components/loading-spinner.js

import CustomSpinner from 'app-name/components/custom-spinner';

export default CustomSpinner;
```

Alternatively, just add your spinner to the template:

```hbs
{{!--app-name/templates/components/loading-spinner.hbs--}}

<img src="some-non-css-spinner.gif">
```

If you really don't want to use the `{{loading-spinner}}` component anywhere in your app, edit the submission component templates as described in [template customization](#template-customization).


## Templating

To customize the template of any components just override the path in your app. For example, `app-name/templates/components/form-submission.hbs` - easy!

To override the template of any Easy Form view, just override the easyform path:

- Error: `app-name/templates/easy-form/error.hbs`
- Hint: `app-name/templates/easy-form/hint.hbs`
- Control: `app-name/templates/easy-form/input-controls.hbs`
- Input: `app-name/templates/easy-form/input.hbs`
- Label: `app-name/templates/easy-form/label.hbs`
