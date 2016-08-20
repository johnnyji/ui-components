import React, {Component} from 'react';
import {CompositeDecorator} from 'draft-js';
import HighlightedWord from '../HighlightedWord';
import Immutable from 'immutable';

const NEVER_MATCHING_REGEX = /$a/;


const createRegexFromWords = (words) => {
  if (!words.size) return NEVER_MATCHING_REGEX;

  // This will produce: `words|like|this|blah`
  const wordsRegexString = words.reduce((string, word, i) => {
    // The last word doesn't need an `or` seperator
    if (!words.get(i + 1)) return `${string}${word}`;
    return `${string}${word}|`;
  }, '');

  return new RegExp(`(${wordsRegexString})`, 'g');
};


const findWithRegex = (regex, text, cb) => {
  let matchArr;
  let start;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    cb(start, start + matchArr[0].length);
  }
};

/**
 * Finds each instance of a word in the contentBlock that matches the regex,
 * and then fires the callback for each found word, so it can be replaced by our custom HighlightedWord
 * component
 * @param  {}   contentBlock - The content block state of our editor
 * @param  {Function} cb - Callback function to invoke every time a matched word is found
 */
const highlightWordStrategy = (contentBlock, cb) => {
  findWithRegex(regex, contentBlock.getText(), cb);
};

const highlightDecorator = Immutable.Map({
  strategy: highlightWordStrategy,
  component: HighlightedWord
});

export default (ComposedEditor) => (class HighlightEditor extends Component {

  static displayName = 'HighlightEditor';

  static propTypes = {
    decorators: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        strategy: PropTypes.func.isRequired,
        component: PropTypes.element.isRequired 
      })
    ).isRequired,
    highlightWords: ImmutablePropTypes.listOf(
      PropTypes.string
    ).isRequired
  };

  static defaultProps = {
    decorators: Immutable.List(),
    highlightWords: Immutable.List()
  };

  constructor(props) {
    super(props);
    this.state = {
      highlightWordsRegex: createRegexFromWords(props.highlightWords);
    };
  }

  componentWillReceiveProps() {
    const {highlightWords: words} = this.props;
    const {highlightWords: nextWords} = this.props;

    if (!Immutable.is(words, nextWords)) {
      this.setState({highlightWordsRegex: createRegexFromWords(nextWords)});
    }
  }

  render() {
    const {decorators, highlightWords, ...restProps} = this.props;

    return (
      <ComposedEditor
        {...restProps}
        decorators={decorators.push(highlightDecorator)} />
    );
  }

});