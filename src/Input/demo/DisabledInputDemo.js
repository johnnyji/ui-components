import React, {Component} from 'react';
import Input from '../Input';
import pureRender from 'pure-render-decorator';

@pureRender
export default class DisabledInputDemo extends Component {

  static displayName = 'DisabledInputDemo';

  render() {
    return (
      <div>
        <Input
          disabled={true}
          onUpdate={this._handleUpdate}
          placeholder="Type here..."
          value="" />
      </div>
    );
  }

  _handleUpdate = (value, error) => {
    this.setState({error, value});
  }
}
