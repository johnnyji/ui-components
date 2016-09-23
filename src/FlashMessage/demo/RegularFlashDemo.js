import React, {PureComponent} from 'react';
import Button from '../../Button/Button';
import {OrderedMap} from 'immutable';
import FlashMessageContainer from '../FlashMessageContainer';
import FlashMessage from '../FlashMessage';
import styles from './index.scss';
import uuid from 'node-uuid';

export default class RegularFlashDemo extends PureComponent {

  static displayName = 'RegularFlashDemo';

  state = {
    messages: OrderedMap(),
    type: 'default'
  };

  render() {
    return (
      <div className={styles.main}>
        <FlashMessageContainer
          items={this.state.messages.valueSeq().toList()}
          onDismiss={this._hideFlashMessage}
          type="error" />
        <h3>Choose flash message type:</h3>
        <div>
          <Button
            active={this.state.type === 'default'}
            onClick={this._handleUpdateType}
            name='default'>Default</Button>
          <Button
            active={this.state.type === 'error'}
            onClick={this._handleUpdateType}
            name='error'>Error</Button>
          <Button
            active={this.state.type === 'success'}
            onClick={this._handleUpdateType}
            name='success'>Success</Button>
          <Button
            active={this.state.type === 'warning'}
            onClick={this._handleUpdateType}
            name='warning'>Warning</Button>
        </div>
        <hr />
        <h3>Want to see a flash message?</h3>
        <Button onClick={this._addFlashMessage}>Click here!</Button>
      </div>
    );
  }

  _addFlashMessage = () => {
    const id = uuid.v4();
    const message = (
      <FlashMessage
        id={id}
        message="Hello!"
        onDismiss={this._dismissFlashMessage}
        key={id}
        type={this.state.type} />
    );

    this.setState({
      messages: this.state.messages.set(id, message)
    });
  };

  _dismissFlashMessage = (id) => {
    this.setState({messages: this.state.messages.delete(id)});
  };

  _handleUpdateType = (type) => {
    this.setState({type});
  };

}

