import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';
import styles from './HighlightedWord.scss';

@pureRender
export default class HighlightedWord extends Component {

  static displayName = 'HighlightedWord';

  render() {
    const {children} = this.props;
    return (
      <span className={styles.main}>{children}</span>
    );
  }

}
