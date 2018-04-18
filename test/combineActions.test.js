import combineActions from '../src/combineActions';
import createActions from '../src/createActions';

test('throws an error if any action is not a function or string', () => {
  expect(() => combineActions(1, 'ACTION_2')).toThrow(
    'Expected action types to be strings, symbols, or action creators'
  );
  expect(() => combineActions('ACTION_1', () => {}, null)).toThrow(
    'Expected action types to be strings, symbols, or action creators'
  );
});

test('accepts action creators and action type strings', () => {
  const { action1, action2 } = createActions('ACTION_1', 'ACTION_2');

  expect(() => combineActions('ACTION_1', 'ACTION_2')).not.toThrow();
  expect(() => combineActions(action1, action2)).not.toThrow();
  expect(() => combineActions(action1, action2, 'ACTION_3')).not.toThrow();
});

test('returns a stringifiable object', () => {
  const { action1, action2 } = createActions('ACTION_1', 'ACTION_2');

  expect(combineActions('ACTION_1', 'ACTION_2').toString()).toBe(
    'ACTION_1||ACTION_2'
  );
  expect(combineActions(action1, action2).toString()).toBe(
    'ACTION_1||ACTION_2'
  );
  expect(combineActions(action1, action2, 'ACTION_3').toString()).toBe(
    'ACTION_1||ACTION_2||ACTION_3'
  );
});
