import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import findWithRegex from '../utils/findWithRegex';
import HighlightedWord from '../HighlightedWord';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

const NEVER_MATCHING_REGEX = /$a/;


const createRegexFromWords = (words) => {
  if (!words || !words.size) return NEVER_MATCHING_REGEX;

  // This will produce: `words|like|this|blah`
  const wordsRegexString = words
    .filter((word) => word !== '')
    .reduce((string, word, i) => {
      // The last word doesn't need an `or` seperator
      if (!words.get(i + 1)) return `${string}${word}`;
      return `${string}${word}|`;
    }, '');

  return new RegExp(`(${wordsRegexString})`, 'g');
};

// Finds each instance of a word in the contentBlock that matches the regex,
// and then fires the callback for each found word, so it can be replaced by our custom HighlightedWord
// component
const highlightWordStrategy = (regex) => (contentBlock, cb) => {
  findWithRegex(regex, contentBlock.getText(), cb);
};

export default (ComposedEditorComponent) => (class HighlightEditor extends Component {

  static displayName = 'HighlightEditor';

  static propTypes = {
    decorators: CustomPropTypes.decorators.isRequired,
    highlightWords: ImmutablePropTypes.listOf(PropTypes.string).isRequired
  };

  static defaultProps = {
    decorators: Immutable.List(),
    highlightWords: Immutable.List()
  };

  constructor(props) {
    super(props);
    this.state = {
      decorators: this._combineDecorators(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    const {decorators, highlightWords: words} = this.props;
    const {decorators: nextDecorators, highlightWords: nextWords} = nextProps;

    if (!Immutable.is(words, nextWords) || !Immutable.is(decorators, nextDecorators)) {
      this.setState({decorators: this._combineDecorators(nextProps)});
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {decorators, highlightWords, ...restProps} = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <ComposedEditorComponent
        {...restProps}
        decorators={this.state.decorators} />
    );
  }

  _combineDecorators = (props) => {
    const regex = createRegexFromWords(props.highlightWords);
    const highlightDecorator = {
      strategy: highlightWordStrategy(regex),
      component: HighlightedWord
    };

    return props.decorators.push(highlightDecorator);
  };

});