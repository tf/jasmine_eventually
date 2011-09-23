/*global*/

var jasmineEventually = (function() {
  function EventuallyMatchers(matchers, expect, waitsFor, runs) {
    function noop() {}

    function silenceMatcherResult(spec, callback) {
      var backup = spec.addMatcherResult,
          result;

      spec.addMatcherResult = function(expectationResult) {
        result = expectationResult.passed();
      };

      callback();
      spec.addMatcherResult = backup;

      return result;
    }

    function wrapMatcher(matchers, name) {
      return function(/* arguments */) {
        var args = arguments;

        waitsFor(function() {
          return silenceMatcherResult(matchers.spec, function() {
            matchers[name].apply(matchers, args);
          });
        });

        runs(function() {
          matchers[name].apply(matchers, args);
        });
      };
    }

    this.not = {};

    for (var name in matchers) {
      if (typeof matchers[name] === 'function' &&
          typeof matchers.not[name] === 'function') {
        this[name] = wrapMatcher(matchers, name);
        this.not[name] = wrapMatcher(matchers.not, name);
      }
    }
  }

  return {
    wrapExpect: function(expect, waitsFor, runs) {
      return function(actual) {
        var matchers = expect(actual);
        matchers.eventually = new EventuallyMatchers(matchers, expect, waitsFor, runs);
        return matchers;
      };
    },

    setup: function() {
      window.expect = this.wrapExpect(window.expect, window.waitsFor, window.runs);
    }
  };
}());