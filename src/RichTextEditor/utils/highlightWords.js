import config from '../config';
import replaceWordWithHtml from './replaceWordWithHtml';

/**
 * Goes through a string of text and highlights every unhighlighted word that matches the
 * words provided in the keywords list
 * @param  {String} text          - The string of text we'll be parsing
 * @param  {Immutable.List} words - A list of words to highlight
 * @return {String}               - The new string of text with every keyword highlighted
 */
export default (text, words) => {
  return words.reduce((alteredText, word) => {
    return replaceWordWithHtml(alteredText, word, config.highlight.tag);
  }, text);
};