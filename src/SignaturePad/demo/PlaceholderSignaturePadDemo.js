import React, {Component} from 'react';
import Icon from '../../Icon/Icon';
import pureRender from 'pure-render-decorator';
import SignaturePad from '../SignaturePad';
import styles from './index.scss';

@pureRender
export default class PlaceholderSignaturePadDemo extends Component {

  static displayName = 'PlaceholderSignaturePadDemo';

  state = {
    error: null
  };

  render() {
    return (
      <div className={styles.main}>
        <SignaturePad
          label={this.state.error || 'Sign here!'}
          onClear={this._handleClearError}
          onSigning={this._handleClearError}
          onSubmit={this._handleSignature}
          placeholder={this._renderPlaceholder()} />
      </div>
    );
  }

  _renderPlaceholder = () => {
    return (
      <div className={styles.placeholder}>
        <Icon className={styles.placeholderText} name='scribble' size={100} />
        <p className={styles.placeholderText}>Scribble here to sign!</p>
      </div>
    );
  };

  _handleSignature = (signature) => {
    if (!signature) {
      this.setState({error: 'Please sign before you submit!'});
      return;
    }
    this.setState({error: null});
    window.open(signature);
  };

  _handleClearError = () => {
    this.setState({error: null});
  };

}

