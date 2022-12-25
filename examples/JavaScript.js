const { console } = require('../dist/index'); // require('console-events')

const listener = () => {
  console.default.log('output from console event');
};

console.addEventListener('log', listener);

console.log('console with event'); // > 'output from console event' \ 'console with event'

console.removeEventListener('log', listener);

console.log('console without event'); // > 'console without event'

const defaultPreventedListener = (event) => {
  event.preventDefault();
  console.default.log('default prevented');
};

console.addEventListener('log', defaultPreventedListener);

console.log('you will never see this!'); // > 'default prevented'

console.removeEventListener('log', defaultPreventedListener);

const multipleArgumentsListener = (event) => {
  console.default.log(`${JSON.stringify(event.arguments)}`);
};

console.addEventListener('log', multipleArgumentsListener);

console.log('one', 'two'); // > '["one", "two"]' \ 'one two'
