var History = require('history');
var assert = require('component-assert');
var history = History();
var test = {};

describe('History#route', function () {

  function none () {}

  function onchange (history) {
    test.fn(history);
  }

  before(function () {
    test.fn = none;
    history.on('change', onchange); 
    history.start();
  });

  beforeEach(function (done) {
    test.fn = none;
    done();
  });

  afterEach(function () {
    test.fn = none;
  });

  it('should emit `change` event', function (done) {
    var route = '#/a';

    test.fn = function (history) {
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

    test.fn = function (history) {
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
