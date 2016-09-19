import React, {PureComponent} from 'react';
import styles from './Demo.scss';
import pureRender from 'pure-render-decorator';

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

