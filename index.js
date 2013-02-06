
/*
 * history
 * History component
 *
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/*
 * Expose `History` singleton
 */

module.exports = history;

/*
 * Module dependencies
 */

var Emitter = require('emitter');

/**
 * singleton
 */

var singleton;

/**
 * history
 * Get the singleton
 */

function history () {
  if (!singleton) {
    singleton = new History();
  }
  return singleton;
}

/*
 * History
 * Create an history.
 *
 * @constructor
 */

function History() {
  if (!(this instanceof History)) {
    return new History();
  }
  Emitter.call(this);
  this.handlers = [];
  this.onchange = this.onchange.bind(this);
  this.started = false;
}

/*
 * Inherit from `Emitter`
 */

History.prototype = Object.create(Emitter.prototype);
History.prototype.constructor = History;

/**
 * route
 * Add a route to be tested when the hash changes. 
 * 
 * @param {String|RegExp} route route
 * @param {Function} callback callback
 * @return {History} this for chaining
 * @api public
 */

History.prototype.route = function (route, callback) {
  this.handlers.push({route: route, callback: callback});
};

/**
 * onchange
 * Load the url, if it's changed.
 * It's called by the browser.
 *
 * @param {Event} event event
 * @api private
 */

History.prototype.onchange = function (event) {
  var hash = window.location.hash;
  var handlers = this.handlers;
  var len = handlers.length;
  var i;
  var handler;
  var route;
  var callback;
  
  for (i = len; i >= 0; i -= 1) {
    handler = handlers[i];
    route = handler.route;
    callback = handler.callback;
    
    if (route.test(hash)) {
      callback(hash);
      return true;
    }
  }
  
  return false;
};

/*
 * start
 * 
 * @return {History} this for chaining
 * @api public
 */

History.prototype.start = function () {
  if (this.started) return;
  window.addEventListener('hashchange', this.onchange);
  this.started = true;
};

/*
 * stop
 * 
 * @return {History} this for chaining
 * @api public
 */

History.prototype.stop = function () {
  window.removeEventListener('hashchange', this.onchange);
  this.started = false;
};
