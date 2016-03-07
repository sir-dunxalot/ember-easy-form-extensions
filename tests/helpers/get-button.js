export default function(context, name) {

  let type;

  switch (name) {
    case 'save': type = 'submit'; break;
    case 'cancel': type = 'reset'; break;
    case 'delete': type = 'button'; break;
  }

  return context.$().find(`.button[type="${type}"]`)[0];
}
