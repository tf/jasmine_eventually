/*global jasmineEventually*/
/*jslint jasmine: true*/

describe('Wrapping expect with jasmineEventually', function() {
  beforeEach(function() {
    jasmineEventually.setup();
  });

  it('allows to match asynchronously with implcit polling', function() {
    var spy = jasmine.createSpy();

    setTimeout(function() {
      spy();
    }, 100);

    expect(spy).eventually.toHaveBeenCalled();
  });
});