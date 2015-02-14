/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-easy-form-extensions',

  included: function(app) {

    /* Because ember-easy-form isn't Ember CLI-ified */

    app.import('vendor/ember-easy-form.js', {
      type: 'vendor'
    });
  }
};
