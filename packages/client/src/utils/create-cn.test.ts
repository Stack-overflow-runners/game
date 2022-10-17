import createCn from './create-cn';

describe('create class name function ', () => {
  let cn: Function;
  beforeAll(() => {
    cn = createCn('block');
  });
  test('cn should be function', () => {
    expect(cn).toBeInstanceOf(Function);
  });
  test('cn func call should return classname', () => {
    expect(cn()).toBe('block');
  });
  test('should return classname with element', () => {
    expect(cn('element')).toBe('block__element');
  });
  test('should return classname with element and modifier', () => {
    expect(cn('element', { modifier: true })).toBe(
      'block__element block__element_modifier'
    );
  });
});
