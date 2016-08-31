import React, {Component} from 'react';
import Input from '../Input';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class RequiredInputDemo extends Component {

  static displayName = 'RequiredInputDemo';

  state = {
    error: null,
    value: ''
  }

  render() {
    return (
      <div className={styles.content}>
        <Input
          className={styles.input}
          displayErrorOn='change'
          error={this.state.error}
          label="Type here..."
          onUpdate={this._handleUpdate}
          required={true}
          value={this.state.value} />
      </div>
    );
  }

  _handleUpdate = (value, error) => {
    this.setState({error, value});
  }
}
