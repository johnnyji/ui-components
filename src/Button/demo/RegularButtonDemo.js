import React, {Component} from 'react';
import Button from '../Button';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RegularButtondDemo extends Component {

  static displayName = 'RegularButtonDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Button className={styles.button} onClick={this._handleClick}>I am clickable!</Button>
        <Button className={styles.button} onClick={this._handleClick}>I am clickable!</Button>
      </div>
    );
  }

  _handleClick = () => {
    alert('Clicked!');
  };

}

