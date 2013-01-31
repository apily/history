
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
}

/*
 * Inherit from `Emitter`
 */

History.prototype = Object.create(Emitter.prototype);
History.prototype.constructor = History;

/*
 * start
 * 
 * @return {History} this for chaining
 * @api public
 */

History.prototype.start = function () {
  function handler (event) {
    
  };

  this.handler = handler.bind(this);
  window.addEventListener('popstate', this.handler);
};
