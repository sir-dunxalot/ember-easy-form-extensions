export default function(context, name, useJquery = false) {

  let type;

  switch (name) {
    case 'save': type = 'submit'; break;
    case 'cancel': type = 'reset'; break;
    case 'delete': type = 'button'; break;
  }

  $button = context.$().find(`.button[type="${type}"]`);

  return useJquery ? $button : $button[0];
}
