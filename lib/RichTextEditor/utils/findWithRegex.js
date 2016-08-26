"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Searchs through a string of text and finds ranges
 * of text that matches the given regex. Then proceeds to
 * call the callback with each range. This is used to create
 * Draft.js decorators. Useful for live altering user input such as
 * hashtags, highlights and mentions
 * @param  {RegExp}   regex - The regex we're using
 * @param  {String}   text  - The text we're traversing
 * @param  {Function} cb    - The callback every time we find a matched range
 */

exports.default = function (regex, text, cb) {
  var matchArr = void 0;
  var start = void 0;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    cb(start, start + matchArr[0].length);
  }
};