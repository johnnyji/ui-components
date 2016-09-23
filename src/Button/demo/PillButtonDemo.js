import React, {PureComponent} from 'react';
import Button from '../Button';
import styles from './index.scss';

export default class PillButtonDemo extends PureComponent {

  static displayName = 'PillButtonDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Button
          className={styles.block}
          isPill={true}>
          Pill Button
        </Button>
        <Button
          active={true}
          className={styles.block}
          isPill={true}>
          Active Pill Button
        </Button>
      </div>
    );
  }

}

