/**
 * history
 * History component
 *
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/**
 * Expose `History` singleton
 */

module.exports = history;

/**
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

/**
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
  this.onchange = this.onchange.bind(this);
  this.started = false;
}

/**
 * Inherit from `Emitter`
 */

History.prototype = Object.create(Emitter.prototype);
History.prototype.constructor = History;


/**
 * onchange
 * Load the url, if it's changed.
 * It's called by the browser.
 *
 * @param {Event} event event
 * @api private
 */

History.prototype.onchange = function (event) {
  this.prev = this.current;
  this.current = '#' + event.newURL.split('#')[1]; //window.location.hash;
  this.emit('change', this);
};

/**
 * start
 * 
 * @return {History} this for chaining
 * @api public
 */

History.prototype.start = function (current) {
  if (this.started) {
    return this;
  }
  this.current = current || '#';
  this.started = true;
  window.onhashchange = this.onchange;
  return this;
};

/**
 * stop
 * 
 * @return {History} this for chaining
 * @api public
 */

History.prototype.stop = function () {
  this.started = false;
  window.onhashchange = this.onchange;
  return this;
};
