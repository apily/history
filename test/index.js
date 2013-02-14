var History = require('history');
var assert = require('component-assert');

describe('History#route', function () {
  var history;

  before(function () {
    history = History();
  });

  beforeEach(function () {
    window.location = '#';
    history.start();
  });

  afterEach(function () {
    history.stop();
  });

  it('should intercept the hash change', function (done) {
    history.route('b', function (new_hash, old_hash) { 
      assert(new_hash === 'b');
      assert(old_hash === 'a');
      done();
    });
    window.location = '#a';
    window.location = '#b';
  });

  it('should emit `change` event', function (done) {
    history.route('b', function () {});
    history.on('change', function (new_hash, old_hash) {
      assert(new_hash === 'b');
      assert(old_hash === 'a');
      done();
    });
    window.location = '#a';
    window.location = '#b';
  });

});
