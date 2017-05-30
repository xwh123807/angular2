describe('1st tests', () => {
  it('true is true', () => expect(true).toBe(true));
});
  
describe('A spec', () => {
  var foo;
  
  beforeEach(() => {
    foo = 0;
    foo += 1;
  });
    
  afterEach(() => {
    foo = 0;
  });
    
  it('is just a function, so it can contain any code', () => {
    expect(foo).toEqual(1);
  });
    
  it('can have more than one expectation', () => {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });
    
  describe('nested inside a second describe', () => {
    var bar;
    
    beforeEach(() => {
      bar = 1;
    });
    
    it('can reference both scope as needed', () => {
      expect(foo).toEqual(bar);
    });
  });
});  