import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import Clickable from '../Clickable';
import Pad from 'signature_pad';
import styles from './SignaturePad.scss';

export default class SignaturePad extends Component {

  static displayName = 'SignaturePad';

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onSignature: PropTypes.func.isRequired,
    resetLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    submitLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired
  };

  static defaultProps = {
    resetLabel: 'Clear',
    submitLabel: 'Submit'
  };

  componentDidMount() {
    window.addEventListener('onresize', this._debouncedSizeCanvas);

    this._sizeCanvas();
    this.signaturePad = new Pad(this.refs.canvas);
  }

  componentWillUnmount() {
    window.removeEventListener('onresize', this._debouncedSizeCanvas);
  }

  render() {
    const {className, label, resetLabel, submitLabel} = this.props;

    return (
      <div className={classNames(styles.main, className)}>
        <canvas className={styles.blankCanvas} ref='blankCanvas'></canvas>
        <div className={styles.pad} ref='canvasWrapper'>
          <canvas ref='canvas'></canvas>
        </div>
        <footer className={styles.footer}>
          <Clickable
            className={styles.reset}
            onClick={this._handleClear}>
            {resetLabel}
          </Clickable>
          {label && <div className={styles.label}>{label}</div>}
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
    const dataUrl = this.signaturePad.toDataURL();

    // If the signature isn't blank, accept it
    if (dataUrl === this.refs.blankCanvas.toDataURL()) return;

    this.props.onSignature(dataUrl);
  };

  _debouncedSizeCanvas = () => debounce(this._sizeCanvas, 10);

  _sizeCanvas = () => {
    const {canvas, canvasWrapper} = this.refs;
    const wrapperDimensions = canvasWrapper.getBoundingClientRect();

    // Make sure the canvas the same dimensions as its wrapper.
    // `canvas` elements must have its dimensions set programmatically like so
    canvas.height = wrapperDimensions.height;
    canvas.width = wrapperDimensions.width;
  };

}

