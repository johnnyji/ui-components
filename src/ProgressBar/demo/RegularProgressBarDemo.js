import React, {Component} from 'react';
import ProgressBar from '../ProgressBar';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RegularProgressBarDemo extends Component {

  static displayName = 'RegularProgressBarDemo';

  render() {
    return (
      <div className={styles.main}>
        <ProgressBar className={styles.bar} value={0} total={100} />
        <ProgressBar className={styles.bar} value={20} total={100} />
        <ProgressBar className={styles.bar} value={40} total={100} />
        <ProgressBar className={styles.bar} value={60} total={100} />
        <ProgressBar className={styles.bar} value={80} total={100} />
        <ProgressBar className={styles.bar} value={100} total={100} />
      </div>
    );
  }

}
