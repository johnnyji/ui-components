import React, {PureComponent} from 'react';
import Button from '../Button';
import Icon from '../../Icon/Icon';
import styles from './index.scss';

export default class RegularButtonDemo extends PureComponent {

  static displayName = 'RegularButtonDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Button className={styles.block} onClick={this._handleClick}>Regular Button</Button>
        <Button className={styles.block} onClick={this._handleClick}><Icon name='add-group' /> Icon Button!</Button>
        <Button active={true} className={styles.block}>Active Button</Button>
      </div>
    );
  }

  _handleClick = () => {
    alert('Clicked!');
  };

}

