var History = require('history');
var assert = require('component-assert');
var history = History();
var onchange = {};

describe('History#route', function () {

  before(function () {
    onchange.fn = function () {};

    history.on('change', function (history) {
      onchange.fn(history);
    });
    
    history.start();
  });

  beforeEach(function () {
    // history.off('change');
  });

  it('should emit `change` event', function (done) {
    var route = '#/a';

    onchange.fn = function (history) {
      assert(history.prev === '#');
      assert(history.current === route);
      done();
    };

    window.location = route;
  });

  it('should emit `change` event for each route', function (done) {
    var routes = ['#', '#/a', '#/b', '#/c'];
    var len = routes.length;
    var i;

    onchange.fn = function (history) {
      var prev = history.prev;
      var current = history.current;
      var i = routes.indexOf(current);
      assert(prev === routes[i-1]);
      done();
    };

    history.prev = '#';
    for (i = 1; i < len; i += 1) {
      window.location = routes[i];
    }

  });

});
