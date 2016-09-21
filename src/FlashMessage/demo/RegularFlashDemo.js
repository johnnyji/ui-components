import React, {PureComponent} from 'react';
import Button from '../../Button/Button';
import FlashMessage from '../FlashMessage';
import styles from './index.scss';

export default class RegularFlashDemo extends PureComponent {

  static displayName = 'RegularFlashDemo';

  state = {
    show: false
  };

  render() {
    return (
      <div className={styles.main}>
        {this.state.show &&
          <FlashMessage
            content="Here's Johnny!"
            onDismiss={this._hideFlashMessage}
            type="error" />
        }
        <h3>Want to see a flash message?</h3>
        <Button onClick={this._showFlashMessage}>Click here!</Button>
      </div>
    );
  }

  _hideFlashMessage = () => {
    this.setState({show: false});
  };

  _showFlashMessage = () => {
    this.setState({show: true});
  };

}

