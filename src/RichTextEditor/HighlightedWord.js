import React, {PureComponent} from 'react';
import styles from './HighlightedWord.scss';

// This is the component that renders a word that's highlighted in the editor
export default class HighlightedWord extends PureComponent {

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
