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
export default (regex, text, cb) => {
  let matchArr;
  let start;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    cb(start, start + matchArr[0].length);
  }
};