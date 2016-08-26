import React, {Component} from 'react';
import Button from '../Button';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RegularButtondDemo extends Component {

  static displayName = 'RegularButtondDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Button onClick={this._handleClick}>I am clickable!</Button>
        <Button onClick={this._handleClick}>I am clickable!</Button>
      </div>
    );
  }

  _handleClick = () => {
    alert('Clicked!');
  };

}

