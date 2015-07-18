# Ember Easy Form Extensions

This addon enhances Ember EasyForm by providing easy event and action handling for your forms.

**To support Ember 1.10+ Easy Form has been temporarily rewritten for Ember CLI. When EasyForm is updated by Dockyard this addon will support that instead of our own form components.**

## Installation

Uninstall any references to `ember-easy-form` and `ember-validations`and then:

```sh
ember install ember-easy-form-extensions
```

## Overview and Example

`ember-easy-form-extensions` comes prepackaged with `ember-easy-form` and `ember-validations` so you can now build awesome forms and handle the subsequent submission events just as easily as Easy Form makes writing your templates.

Here's an example:

```hbs
{{!--app-name/templates/posts/new.hbs--}}

{{#form-wrapper}}
  {{#form-controls legend='Write a new post'}}

    {{!--model.title--}}
    {{input-group property='title'}}

    {{!--model.description--}}
    {{input-group property='description' type='textarea'}}

  {{/form-controls}}

  {{!--Submit and cancel buttons--}}
  {{form-submission}}
{{/form-wrapper}}
```

```js
// app-name/controllers/posts/new.js

import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.Controller.extend(
  FormMixin, {

  validations: {
    'model.title': {
      presence: true
    }
  }

  /* Runs if cancel button in {{form-submission}} is clicked */

  cancel: function() {
    this.transitionTo('posts');
  },

  /* Runs after validations pass and submit button in {{form-submission}} is clicked */

  save: function() {
    this.get('content').save().then(function(post) {
      this.transitionTo('post', post);
    });
  },

});
```

## Documentation

A walkthrough and documentation can be found in the [wiki](https://github.com/sir-dunxalot/ember-easy-form-extensions/wiki).
