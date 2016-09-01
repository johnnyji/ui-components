import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import CustomPropTypes from './utils/CustomPropTypes';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import InputError from './InputError';
import pureRender from 'pure-render-decorator';
import styles from './Input.scss';

// Key code for the Enter key
const ENTER = 13;

@pureRender
export default class Input extends Component {

  static displayName = 'Input';

  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    displayError: PropTypes.bool.isRequired,
    displayErrorOn: PropTypes.oneOf(['change', 'blur']).isRequired,
    error: PropTypes.string,
    errorType: PropTypes.oneOf(['error', 'warning']).isRequired,
    inputClassName: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
    labelIcon: PropTypes.string,
    name: PropTypes.string,
    onEnterKeyPress: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
    patternMatches: PropTypes.oneOfType([
      ImmutablePropTypes.listOf(CustomPropTypes.errorMatcher),
      CustomPropTypes.errorMatcher
    ]),
    required: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
    value: PropTypes.string.isRequired,
  };

  static defaultProps = {
    autoFocus: false,
    disabled: false,
    displayError: false,
    displayErrorOn: 'blur',
    errorType: 'error',
    required: false,
    type: 'text'
  };

  state = {
    shouldDisplayError: false
  };

  render() {
    const {
      autoFocus,
      className,
      disabled,
      error,
      errorType,
      inputClassName,
      label,
      labelIcon,
      required,
      type,
      value
    } = this.props;
    const shouldRenderError = this._shouldRenderError();
    const inputLabel = labelIcon ? <span>{labelIcon}{label}</span> : label;
    const inputClasses = classNames(
      styles.input,
      inputClassName,
      disabled ? styles.disabled : null,
      shouldRenderError ? styles[errorType] : null
    );

    return (
      <div className={classNames(className, styles.main)}>
        {!disabled && required && <span className={styles.requiredAsterisk}>*</span>}
        <input
          autoFocus={autoFocus}
          className={inputClasses}
          disabled={disabled}
          placeholder={inputLabel}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          onKeyDown={this._handleKeyDown}
          onFocus={this._handleFocus}
          type={type}
          value={value} />
        {!disabled && shouldRenderError && <InputError error={error} type={errorType} />}
      </div>
    );
  }

  /**
   * Forces the `onUpdate` prop to be triggered. This is useful for when you need the latest and
   * most accurate error/value
   */
  forceUpdate = () => {
    this._submitValue({target: {value: this.props.value}});
  }

  /**
   * Returns whether or not the input field value is valid
   * @return {Boolean} - The validity of the field
   */
  valid = () => {
    return this.props.error === null && this._getError(this.props.value) === undefined;
  };

  _shouldRenderError = () => {
    const {error, displayError} = this.props;
    const {shouldDislayError} = this.state;

    // No error
    if (!error) return false;
    // Error and we need to display it
    if (displayError || shouldDislayError) return true;
    // Error but no need to display it
    return false;
  };

  /**
   * Checks it's provided value against the input field's `patternMatches` prop
   * and returns either an error or undefined
   * @param  {String} value - The value that we're validating
   * @return {String|Null} - The error string in `patternMatches` or null
   */
  _getError = (value) => {
    const {patternMatches} = this.props;

    if (!patternMatches) return null;

    if (Immutable.List.isList(patternMatches)) {
      // Goes through all the validators and returns the first the error of the
      // first pattern that the value doesn't match
      const errorMatch = patternMatches.find((pattern) => {
        if (!pattern.validator(value)) return pattern.error;
      });
      return errorMatch === undefined ? null : errorMatch.error;
    }

    // Checks the validity of the value against the pattern, and returns an error if no match
    return patternMatches.validator(value) ? null : patternMatches.error;
  };

  /**
   * Checks to see if potential errors should be displayed and submits the input value every time the input blurs
   * @param  {Object} e - The blur event object
   */
  _handleBlur = (e) => {
    if (this.props.displayErrorOn === 'blur') this.setState({shouldDislayError: true});
    this._submitValue(e);
  };

  /**
   * Checks to see if potential errors should be displayed and submits the input value every time the value changes
   * @param  {Object} e - The change event object
   */
  _handleChange = (e) => {
    if (this.props.displayErrorOn === 'change') this.setState({shouldDislayError: true});
    this._submitValue(e);
  };

  /**
   * Forbids the input field from showing any errors and updates the parent component with it's value
   * @param  {Object} e - The focus event object
   */
  _handleFocus = (e) => {
    // It only makes sense to hide the error on focus, if the error is displayed
    // on blur
    if (this.props.displayErrorOn === 'blur') {
      this.setState({shouldDislayError: false});
    }
    this._submitValue(e);
  };
    
  /**
   * Handles when the enter key is pressed
   * @param  {Object} e - The enter key press event
   */
  _handleKeyDown = (e) => {
    if (e.which === ENTER) {
      const {onEnterKeyPress} = this.props;

      if (onEnterKeyPress) onEnterKeyPress();
      this._submitValue(e);
    }
  };

  /**
   * Checks the input value, and submits it to the parent component, along with errors if there
   * are any.
   * @param  {Object} options    - The options argument
   * @param  {Object} options.target.value    - The event object that triggered the value submit
   */
  _submitValue = ({target: {value}}) => {
    // If the input value doesn't match the regex we passed in, we're going to trigger an error callback
    const error = this._getError(value) || null;
    // Updates the parent component with both the value and the error
    this.props.onUpdate(value, error, this.props.name);
  };

}
