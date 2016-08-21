import React, {Component} from 'react';
import Input from '../Input';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class DisabledInputDemo extends Component {

  static displayName = 'DisabledInputDemo';

  render() {
    return (
      <div className={styles.content}>
        <Input
          className={styles.input}
          disabled={true}
          label='Disabled'
          onUpdate={this._handleUpdate}
          value="" />
      </div>
    );
  }

  _handleUpdate = () => {};

}
