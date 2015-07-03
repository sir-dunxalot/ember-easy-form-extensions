import Ember from 'ember';

const { get } = Ember;

export default function nearestControllerWithProperty(context, property) {
  let view = get(context, 'parentView');

  while (view) {
    const controller = get(view, 'controller');

    console.log(view.toString());

    if (property in controller) {
      return controller;
    }

    view = get(view, 'parentView');
  }
}
