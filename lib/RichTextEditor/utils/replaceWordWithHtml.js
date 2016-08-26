'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _escapeRegExp = require('lodash/escapeRegExp');

var _escapeRegExp2 = _interopRequireDefault(_escapeRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps an HTML tag (with class) around every instance of word in a body of text. Word should be some
 * unique identifier such as `CASED_LIKE_THIS`, so we don't accidentally replace real HTML tags with that word.
 *
 * @param  {String} text                - The body of text to scan
 * @param  {String} word                - The word we're converting to HTML
 * @param  {String} tag                 - The HTML tag we will use
 * @param  {String} className           - The class we will give the tag
 * @param  {String} insertZeroWidthChar - Whether or not we should insert a zero width car,
 *                                      this is necessary in contenteditable elements
 *                                      otherwise, the style of the html tags will drag on
 * @return {String}                     - The newly altered text
 */

exports.default = function (text, word) {
  var tag = arguments.length <= 2 || arguments[2] === undefined ? 'span' : arguments[2];
  var className = arguments[3];
  var insertZeroWidthChar = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

  var openingTag = className ? '<' + tag + ' class="' + className + '">' : '<' + tag + '>';
  var closingTag = '</' + tag + '>';

  // JavaScript doesn't support negative lookbehinds... Of course.
  // const negativeLookbehind = `(?<!<${tag} class="${className}">)`;

  // Looks behind the word to make sure we don't match words already ending in the same HTML tag
  var negativeLookahead = '(?!' + (0, _escapeRegExp2.default)(closingTag) + ')';

  var matcher = new RegExp('' + (0, _escapeRegExp2.default)(word) + negativeLookahead, 'g');

  // If this function is being used to replace words that will be used in a content editable field, we need to
  // add a unicode zero-width character,
  // refer to: http://stackoverflow.com/questions/21574522/contenteditable-put-caret-outside-inserted-span
  var htmlWord = insertZeroWidthChar ? '' + openingTag + word + closingTag + '​' : '' + openingTag + word + closingTag;

  return text.replace(matcher, function (word, wordStartingIndex) {
    // Note: This is the workaround for JavaScript's lack of a negative lookbehind...

    // Not possible the opening tag matches, there's not enough space for it, so we add the HTML tags.
    if (wordStartingIndex < openingTag.length) return htmlWord;

    var openingTagStartingIndex = wordStartingIndex - openingTag.length;
    var possibleOpeningTag = text.substring(openingTagStartingIndex, wordStartingIndex);

    return possibleOpeningTag === openingTag ? word : htmlWord;
  });
};