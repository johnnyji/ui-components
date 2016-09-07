import React, {PureComponent} from 'react';
import Spinner from '../Spinner';
import styles from './index.scss';

export default class RegularSpinnerDemo extends PureComponent {

  static displayName = 'RegularSpinnerDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Spinner className={styles.spinner} size='small' />
        <Spinner className={styles.spinner} size='medium' />
        <Spinner className={styles.spinner} size='large' />
      </div>
    );
  }

}

