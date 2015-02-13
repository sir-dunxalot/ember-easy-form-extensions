export default function defaultFor(variable, defaultValue) {
  if (typeof variable !== 'undefined' && variable !== null) {
    return variable;
  } else {
    return defaultValue;
  }
}
