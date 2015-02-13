/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-easy-form-extensions',

  included: function(app) {
    app.import('vendor/ember-easy-form.js', {
      type: 'vendor'
    });
    // app.import('node_modules/ember-validations/index.js');
  }
};
