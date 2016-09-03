import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
// Must import directly from component source, otherwise webpack throws error on prod
import Clickable from '../Clickable/Clickable';
import Pad from 'signature_pad';
import styles from './SignaturePad.scss';

export default class SignaturePad extends Component {

  static displayName = 'SignaturePad';

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onClear: PropTypes.func,
    onSigning: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.element,
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

  state = {
    loaded: false,
    showPlaceholder: true,
    signing: false
  };

  componentDidMount() {
    // window.addEventListener('resize', this._debouncedSizeCanvas);

    this._sizeCanvas();
    this.signaturePad = new Pad(this.refs.canvas);

    // We need to track a loading state to make sure
    // the signature pad instance is existant before we render content
    this.setState({loaded: true});
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this._debouncedSizeCanvas);
  // }

  render() {
    const {loaded, showPlaceholder, signing} = this.state;
    const {className, label, placeholder, resetLabel, submitLabel} = this.props;
    const shouldDisplayPlaceholder = loaded && this.signaturePad._isEmpty && !signing && placeholder && showPlaceholder;

    return (
      <div className={classNames(styles.main, className)}>
        <div
          className={styles.pad}
          onClick={this._hidePlaceholder}
          onMouseEnter={this._hidePlaceholder}
          onMouseLeave={this._showPlaceholder}
          ref='canvasWrapper'>
          {shouldDisplayPlaceholder &&
            React.cloneElement(placeholder, {
              className: classNames(placeholder.props.className, styles.placeholder)
            })
          }
          <canvas onMouseDown={this._handleSigning} ref='canvas'></canvas>
        </div>
        <footer className={styles.footer}>
          <Clickable onClick={this._handleClear}>
            {resetLabel}
          </Clickable>
          {label && <div className={styles.label}>{label}</div>}
          <Clickable onClick={this._handleSubmit}>
            {submitLabel}
          </Clickable>
        </footer>
      </div>
    );
  }

  // _debouncedSizeCanvas = () => {
  //   clearTimeout(this._onResize);
  //   this._onResize = setTimeout(this._sizeCanvas, 10);
  // };

  _handleClear = () => {
    this.signaturePad.clear();
    if (this.props.onClear) this.props.onClear();
    this.setState({signing: false});
  };

  _handleSigning = () => {
    if (this.props.onSigning) this.props.onSigning();
    this.setState({signing: true});
  };

  _handleSubmit = () => {
    if (this.signaturePad._isEmpty) {
      this.props.onSubmit();
      return;
    }

    this.props.onSubmit(this.signaturePad.toDataURL());
  };

  _hidePlaceholder = () => {
    this.setState({showPlaceholder: false});
  };

  _showPlaceholder = () => {
    this.setState({showPlaceholder: true});
  };

  _sizeCanvas = () => {
    const {canvas, canvasWrapper} = this.refs;
    const {height, width} = canvasWrapper.getBoundingClientRect();

    // Make sure the canvas the same dimensions as its wrapper.
    // `canvas` elements must have its dimensions set programmatically like so
    canvas.height = height;
    canvas.width = width;
  };

}

