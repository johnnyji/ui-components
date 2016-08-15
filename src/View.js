import React, {Component} from 'react';
import styles from './View.scss';
import pureRender from 'pure-render-decorator';

@pureRender
export default class View extends Component {

  static displayName = 'View';
  
  render() {
    return (
      <div className={styles.view}>
        Hello world!
      </div>
    );
  }

}

