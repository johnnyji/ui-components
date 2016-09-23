import React, {PureComponent} from 'react';
import styles from './Demo.scss';

export default class Demo extends PureComponent {

  static displayName = 'Demo';
  
  render() {
    return (
      <div className={styles.main}>
        {this.props.children}
      </div>
    );
  }

}

