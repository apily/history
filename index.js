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
 * singleton
 */

var singleton;

/**
 * History
 * Create an history.
 *
 * @constructor
 */

function history () {
  if (!singleton) {
    singleton = new History();
  }
  return singleton;
}

function History () {
  this._onchange = this._onchange.bind(this);
  this.onchange = function () {};
}

history.History = History;

/**
 * History.use
 * Use a plugin
 * 
 * @params {Function} fn plugin
 * @return {History} History constructor
 * @api public
 */

History.use = function (fn) {
  fn(this);
  return this;
};


/**
 * onchange
 * Load the url, if it's changed.
 * It's called by the browser.
 *
 * @param {Event} event event
 * @api private
 */

History.prototype._onchange = function (event) {
  this.prev = this.current;
  this.current = '#' + event.newURL.split('#')[1]; //window.location.hash;
  this.onchange(this);
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
  window.onhashchange = this._onchange;
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
  window.onhashchange = this._onchange;
  return this;
};
