import React, {Component} from 'react';
import styles from './App.scss';
import pureRender from 'pure-render-decorator';

@pureRender
export default class App extends Component {

  static displayName = 'App';
  
  render() {
    return (
      <div className={styles.main}>
        {this.props.children}
      </div>
    );
  }

}

