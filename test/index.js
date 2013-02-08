var History = require('history');
var assert = require('component-assert');

describe('History#route', function () {
  var history;

  before(function () {
    history = History();
  });

  beforeEach(function (done) {
    console.log('start');
    window.location = '#';
    setTimeout(function () {
      history.start();
      done();
    }, 100);
  });

  afterEach(function (done) {
    console.log('stop');
    history.stop();
    done();
  });

  it('should intercept the hash change', function (done) {
    history.route('a', function() { 
      console.log(arguments);
      done();
    });
    setTimeout(function () {
      window.location = '#z';
      setTimeout(function () {
        window.location = '#a';
      }, 100);
    }, 100);
  });

});
