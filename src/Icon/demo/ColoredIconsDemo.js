import React, {Component} from 'react';
import Icon from '../Icon';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class ColoredIconsDemo extends Component {

  static displayName = 'ColoredIconsDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Icon className={styles.green} name='check' />
        <Icon className={styles.yellow} name='alert' />
        <Icon className={styles.red} name='close' />
      </div>
    );
  }

}
