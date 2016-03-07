Ember Easy Form Extensions [![Build Status](https://travis-ci.org/sir-dunxalot/ember-easy-form-extensions.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-easy-form-extensions)
======

This Ember addon manages form submission in the controller/component and route layers of Ember apps.

It works alongside most form component addons including but not limited to [Ember EasyForm](https://github.com/DockYard/ember-easy-form) and [Ember Paper](https://github.com/miguelcobain/ember-paper).

**Ember EasyForm is not longer a required dependency for this addon.**

## Installation

```sh
npm uninstall --save-dev ember-validations
ember install ember-easy-form-extensions
```

## Overview and Example

Designed to handle formsubmission events, ember-easy-form-extensions reduces boilerplate code and standardizes form submission whilst providing a broad API for you to interact with.

```hbs
{{!--app-name/templates/users/new.hbs--}}

<form>

  <controls>
    {{input value=firstName}}
    {{input value=lastName}}
  </controls>

  {{!--Submit and cancel buttons--}}
  {{form-submission formIsSubmitted=formIsSubmitted}}

</form>
```

```js
// app-name/controllers/users/new.js

import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/components/form';

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

A walkthrough and documentation can be found in [the wiki](https://github.com/sir-dunxalot/ember-easy-form-extensions/wiki).

1. [Form templates](https://github.com/sir-dunxalot/ember-easy-form-extensions/wiki/1.-Form-Template)
2. [Validating models](https://github.com/sir-dunxalot/ember-easy-form-extensions/wiki/2.-Validating-Models)]
3. [Saving Models](https://github.com/sir-dunxalot/ember-easy-form-extensions/wiki/3.-Saving-Models)
4. [Deleting Models](https://github.com/sir-dunxalot/ember-easy-form-extensions/wiki/4.-Deleting-Models)
