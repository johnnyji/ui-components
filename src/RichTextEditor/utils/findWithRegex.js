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
export const findWithRegex = (regex, text, charList, cb) => {
  let start;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;

    cb(start, start + matchArr[0].length);
  }
};

/**
 * Searchs through a string of text and matches only words found in the regex.
 * Once a word has been matched, we also ensure that the world has consistent styles through every letter.
 * The start/end range of the found word is then pass on through the callback function
 * @param  {RegExp} regex - The regex we're using
 * @param  {String} text - The text we're traversing
 * @param  {Immutable.List} charList - The list of CharacterMetadata objects from the editor
 * @param  {Function} cb - The callback every time we find a matched range
 */
export const findHighlightableWord = (regex, text, charList, cb) => {
  let matchArr;
  let end;
  let start;
  let style;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    end = start + matchArr[0].length;
    // The style of first character, this style
    // must the be same throughout the rest of the word
    style = charList.get(start).getStyle();

    // If the styles of the word is the same throughout, we execute
    // our `cb` function
    if (
      charList
        .slice(start + 1, end + 1)
        .reduce((same, item) => item.getStyle() === style, true)
    ) {
      // Invokes a callback for with the range of every highlightable word found
      // in the text
      cb(start, end);
    }
  }
};
