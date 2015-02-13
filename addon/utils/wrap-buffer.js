export default function wrapBuffer(open, close, options, context) {
  options.data.buffer.push('\n' + open);

  if (options.fn(context)) {
    options.data.buffer.push('\n' + options.fn(context));
  }

  options.data.buffer.push('\n' + close);
}
