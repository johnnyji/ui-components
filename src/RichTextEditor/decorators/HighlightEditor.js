import React, {PropTypes, PureComponent} from 'react';
import createRegexFromWords from '../utils/createRegexFromWords';
import CustomPropTypes from '../utils/CustomPropTypes';
import {findHighlightableWord} from '../utils/findWithRegex';
import HighlightedWord from '../HighlightedWord';
import {is, List} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

// Finds each instance of a word in the contentBlock that matches the regex,
// and then fires the callback for each found word, so it can be replaced by our custom HighlightedWord
// component
const highlightWordStrategy = (regex) => (contentBlock, cb) => {
  findHighlightableWord(regex, contentBlock.getText(), contentBlock.getCharacterList(), cb);
};

export default (ComposedEditorComponent) => (class HighlightEditor extends PureComponent {

  static displayName = 'HighlightEditor';

  static propTypes = {
    decorators: CustomPropTypes.decorators.isRequired,
    highlightWords: ImmutablePropTypes.listOf(PropTypes.string).isRequired
  };

  static defaultProps = {
    decorators: List(),
    highlightWords: List()
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

    // If the words to highlight or the decorators change, we need to reconstruct
    // the decorators
    if (!is(words, nextWords) || !is(decorators, nextDecorators)) {
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
    // This makes sure that no empty strings are considered highlight words
    const validHighlightWords = props.highlightWords.filter((w) => w !== '');

    // If there are no words to highlight, just return the existing decorators
    if (!validHighlightWords.size) return props.decorators;

    const regex = createRegexFromWords(validHighlightWords);
    const highlightDecorator = {
      strategy: highlightWordStrategy(regex),
      component: HighlightedWord
    };

    return props.decorators.push(highlightDecorator);
  };

});
