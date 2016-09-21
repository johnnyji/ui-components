import React, {PureComponent} from 'react';
import Button from '../../Button/Button';
import {Map} from 'immutable';
import FlashMessageContainer from '../FlashMessageContainer';
import FlashMessage from '../FlashMessage';
import styles from './index.scss';
import uuid from 'node-uuid';

export default class RegularFlashDemo extends PureComponent {

  static displayName = 'RegularFlashDemo';

  state = {
    messages: Map()
  };

  render() {
    return (
      <div className={styles.main}>
        <FlashMessageContainer
          items={this.state.messages.valueSeq().toList()}
          onDismiss={this._hideFlashMessage}
          type="error" />
        <h3>Want to see a flash message?</h3>
        <Button onClick={this._addFlashMessage}>Click here!</Button>
      </div>
    );
  }

  _addFlashMessage = () => {
    const id = uuid.v4();

    this.setState({
      messages: this.state.messages.set(id, <FlashMessage id={id} message="Hello!" onDismiss={this._dismissFlashMessage} key={id} />)
    });
  };

  _dismissFlashMessage = (id) => {
    this.setState({messages: this.state.messages.delete(id)});
  };

}

