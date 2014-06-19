/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("history", function (exports, module) {
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
  this.prev = '#';
  this.current = current || window.location.hash;
  this.started = true;
  window.onhashchange = this._onchange;
  this.onchange(this);
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

});

require("history")
