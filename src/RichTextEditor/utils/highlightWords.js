import replaceWordWithHtml from './replaceWordWithHtml';

/**
 * Goes through a string of text and highlights every unhighlighted word that matches the
 * words provided in the keywords list
 * @param  {String} text                - The string of text we'll be parsing
 * @param  {Immutable.List|Array} words - A list of words to highlight
 * @param  {String} tag                 - The html tag we use to highlight words
 * @param  {String} className           - A className to add to the tag
 * @return {String}                     - The new string of text with every keyword highlighted
 */
export default (text, words, tag, className) => {
  // If no words or tag, no way to highlight
  if (!words || !tag) return text;

  const validWords = words.filter((w) => w !== '');

  // If there are no words for us to highlight, return text as/is
  if (!validWords.size) return text;

  return words.reduce((alteredText, word) => {
    return replaceWordWithHtml(alteredText, word, tag, className);
  }, text);
};