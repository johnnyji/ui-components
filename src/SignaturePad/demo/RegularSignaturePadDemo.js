import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';
import SignaturePad from '../SignaturePad';
import styles from './index.scss';

@pureRender
export default class RegularSignaturePadDemo extends Component {

  static displayName = 'RegularSignaturePadDemo';

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
          onSubmit={this._handleSignature} />
      </div>
    );
  }

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

