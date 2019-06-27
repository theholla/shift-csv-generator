const { getIcsDateArr, getTimeForDesc, transformTime } = require('../src/lib');

test('getIcsStart', () => {
  // avoiding 'Legacy octal literals are not allowed in strict mode' err :/
  const dateArr = ['2019', '06', '05', '17', '30'].map(str => parseInt(str, 10));
  expect(getIcsDateArr('2019-06-05', '17:30:00')).toEqual(dateArr);
});

test('getTimeForDesc', () => {
  expect(getTimeForDesc('09:00:00')).toEqual('9:00 AM');
  expect(getTimeForDesc('09:59:00', '13:30:00')).toEqual('9:59 AM - 1:30 PM');
});

test('transformTime', () => {
  expect(transformTime('11:00:00')).toEqual('11:00 AM');
  expect(transformTime('12:00:00')).toEqual('12:00 PM');
  expect(transformTime('13:00:00')).toEqual('1:00 PM');
  expect(transformTime('23:59:59')).toEqual('11:59 PM');
});
