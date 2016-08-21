import React, {Component} from 'react';
import Input from '../Input';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RegularInputDemo extends Component {

  static displayName = 'RegularInputDemo';

  state = {
    error: null,
    value: ''
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.label}>Value: {this.state.value}</div>
        <div className={styles.label}>Error: {this.state.error}</div>
        <Input
          className={styles.input}
          error={this.state.error}
          label="Type here..."
          onUpdate={this._handleUpdate}
          value={this.state.value} />
      </div>
    );
  }

  _handleUpdate = (value, error) => {
    this.setState({error, value});
  }
}
