import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

import asyncClick from './async/async-click';
import fillInInputFor from './async/fill-in-input-for';
import inspectInputFor from './sync/inspect-input-for';
import inspectModelValueFor from './sync/inspect-model-value-for';
import inspect from './sync/inspect';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
