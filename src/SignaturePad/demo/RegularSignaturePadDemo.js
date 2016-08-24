import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RegularSignaturePadDemo extends Component {

  static displayName = 'RegularSignaturePadDemo';

  render() {
    return (
      <div className={styles.main}>
      </div>
    );
  }

}

