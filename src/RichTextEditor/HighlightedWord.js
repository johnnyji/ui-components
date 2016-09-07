import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';
import styles from './HighlightedWord.scss';

// This is the component that renders a word that's highlighted in the editor
@pureRender
export default class HighlightedWord extends Component {

  static displayName = 'HighlightedWord';

  render() {
    // TODO: Is there a way to control how we how we render the word
    // based on if styles changed mid-word? Really need this because
    // HTML parsing can't handle multiple style changes in one highlight word
    return (
      <span className={styles.main}>{this.props.children}</span>
    );
  }

}
