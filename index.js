/*
 * history
 * History component
 *
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/*
 * Expose `History`
 */

module.exports = new History();

/*
 * Module dependencies
 */

var Emitter = require('emitter');

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
  this.handlers = {};
  this.onchange = this.onchange.bind(this);
}

/*
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

History.prototype.onchange = (event) {
  var hash = window.location.hash;
};

/*
 * start
 * 
 * @return {History} this for chaining
 * @api public
 */

History.prototype.start = function () {
  window.addEventListener('hashchange', this.onchange);
};

/*
 * stop
 * 
 * @return {History} this for chaining
 * @api public
 */

History.prototype.stop = function () {
  window.removeEventListener('hashchange', this.onchange);
};
