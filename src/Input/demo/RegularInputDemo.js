import React, {Component} from 'react';
import Input from '../Input';

export default class RegularInputDemo extends Component {

  static displayName = 'RegularInputDemo';

  state = {
    error: null,
    value: ''
  }

  render() {
    return (
      <Input
        error={this.state.error}
        onUpdate={this._handleUpdate}
        value={this.state.value} />
    );
  }

  _handleUpdate = (value, error) => {
    this.setState({error, value});
  }
}
