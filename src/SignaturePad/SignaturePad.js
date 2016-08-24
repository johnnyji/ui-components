import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Clickable from '../Clickable';
import Pad from 'signature_pad';
import pureRender from 'pure-render-decorator';
import styles from './SignaturePad.scss';

@pureRender
export default class SignaturePad extends Component {

  static displayName = 'SignaturePad';

  static propTypes = {
    className: PropTypes.string,
    onSignature: PropTypes.func.isRequired,
    resetLabel: PropTypes.oneOf(
      PropTypes.string,
      PropTypes.element
    ).isRequired,
    submitLabel: PropTypes.oneOf(
      PropTypes.string,
      PropTypes.element
    ).isRequired
  };

  static defaultProps = {
    resetLabel: 'Clear',
    submitLabel: 'Submit'
  };

  componentDidMount = () => {
    this.signaturePad = new Pad(this.refs.pad);
  };
  
  render() {
    const {className, resetLabel, submitLabel} = this.props;

    return (
      <div className={classNames(styles.main, className)}>
        <canvas className={styles.pad} ref='pad'></canvas>
        <footer className={styles.footer}>
          <Clickable
            className={styles.reset}
            onClick={this._handleClear}>
            {resetLabel}
          </Clickable>
          <Clickable
            className={styles.submit}
            onClick={this._handleSubmit}>
            {submitLabel}
          </Clickable>
        </footer>
      </div>
    );
  }

  _handleClear = () => {
    this.signaturePad.clear();
  };

  _handleSubmit = () => {
    this.props.onSignature(this.signaturePad.toDataUrl());
  };

}

