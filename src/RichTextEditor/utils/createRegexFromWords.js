const NEVER_MATCHING_REGEX = /$a/;

/**
 * Creates a regex matcher based on a list of words. The
 * returned RegExp will match every word in the list.
 * @param  {Immutable.List} words - List of words that should be matched
 * @return {RegExp} - The RegExp that matches the input words
 */
export default (words) => {
  if (!words || !words.size) return NEVER_MATCHING_REGEX;

  // This will produce: `words|like|this|blah`
  const wordsRegexString = words.reduce((string, word, i) => {
    // The last word doesn't need an `or` seperator
    if (!words.get(i + 1)) return `${string}${word}`;
    return `${string}${word}|`;
  }, '');

  return new RegExp(`(${wordsRegexString})`, 'g');
};

