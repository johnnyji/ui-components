import React, {Component} from 'react';
import Clickable from '../Clickable';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RegularClickabledDemo extends Component {

  static displayName = 'RegularClickabledDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Clickable onClick={this._handleClick}>I am clickable!</Clickable>
        <Clickable onClick={this._handleClick}>I am clickable!</Clickable>
      </div>
    );
  }

  _handleClick = () => {
    alert('Clicked!');
  };

}

