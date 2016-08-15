import React, {Component} from 'react';
import styles from './Demo.scss';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Demo extends Component {

  static displayName = 'Demo';
  
  render() {
    return (
      <div className={styles.main}>
        {this.props.children}
      </div>
    );
  }

}

