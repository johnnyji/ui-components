import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';
import SignaturePad from '../SignaturePad';
import styles from './index.scss';

@pureRender
export default class RegularSignaturePadDemo extends Component {

  static displayName = 'RegularSignaturePadDemo';

  render() {
    return (
      <div className={styles.main}>
        <SignaturePad
          label='Sign here!'
          onSignature={this._handleSignature} />
      </div>
    );
  }

  _handleSignature = (signature) => {
    window.open(signature);
  };

}

