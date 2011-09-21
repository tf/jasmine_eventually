# Jasmine Eventually

* [github.com/tf/jasmine_eventually](http://github.com/tf/jasmine_eventually)

Asynchronous matching without `runs` and `waitsFor`.

### Usage

```javascript
describe('jasmineEventually', function() {
  it('allows to match asynchronously with implicit polling', function() {
    var spy = jasmine.createSpy();

    setTimeout(function() {
      spy();
    }, 100);

    expect(spy).eventually.toHaveBeenCalled();
  });
});
```

is equivalent to

```javascript
describe('jasmineEventually', function() {
  it('allows to match asynchronously with implicit polling', function() {
    var spy = jasmine.createSpy();

    setTimeout(function() {
      spy();
    }, 100);

    waitsFor(function() {
      return spy.wasCalled;
    });

    runs(function() {
      expect(spy).toHaveBeenCalled();
    });
  });
});
```

`eventually` inserts a `waitsFor` block which silences the matcher
output and polls its result until it becomed `true`.

### Here be Dragons

`eventually` only works for matchers which use the `actual` object
passed to `expect` as a reference.  The following will not work:

```javascript
describe('jasmineEventually', function() {
  it('can not operate on primitive types', function() {
    var elapsed = false;

    setTimeout(function() {
      elapsed = true;
    }, 100);

    // WILL NOT WORK
    expect(elapsed).eventually.toBeTruthy();
  });
});
```

`elapsed` is passed as a value.  Setting the variable to `true` later
on does not change the value visibile inside the matcher.

### Installation

Just link `src/jasmine_eventually.js` from your jasmine spec runner
and put this setup somewhere inside your support files:

```javascript
beforeEach(function() {
  jasmineEventually.setup();
});
```

### License

Please fork and improve.

Copyright (c) 2011 Tim Fischbach. This software is licensed under the MIT License.