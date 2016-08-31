import React, {Component} from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class ColoredIconsDemo extends Component {

  static displayName = 'ColoredIconsDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Icon className={classNames(styles.icon, styles.green)} name='check' />
        <Icon className={classNames(styles.icon, styles.yellow)} name='alert' />
        <Icon className={classNames(styles.icon, styles.red)} name='close' />
      </div>
    );
  }

}
