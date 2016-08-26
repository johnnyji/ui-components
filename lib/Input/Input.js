'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CustomPropTypes = require('./utils/CustomPropTypes');

var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _InputError = require('./InputError');

var _InputError2 = _interopRequireDefault(_InputError);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _Input = require('./Input.scss');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Key code for the Enter key
var ENTER = 13;
var RETURN_TRUE = function RETURN_TRUE() {
  return true;
};

var Input = (0, _pureRenderDecorator2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Input)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      shouldDisplayError: false
    }, _this.forceUpdate = function () {
      _this._submitValue({ target: { value: _this.props.value } });
    }, _this.valid = function () {
      return _this.props.error === null && _this._getError(_this.props.value) === undefined;
    }, _this._shouldRenderError = function () {
      var _this$props = _this.props;
      var error = _this$props.error;
      var displayError = _this$props.displayError;
      var shouldDislayError = _this.state.shouldDislayError;

      // No error

      if (!error) return null;
      // Error and we need to display it
      if (displayError || shouldDislayError) return error;
      // Error but no need to display it
      return null;
    }, _this._getError = function (value) {
      var patternMatches = _this.props.patternMatches;


      if (!patternMatches) return null;

      if (_immutable2.default.List.isList(patternMatches)) {
        // Goes through all the validators and returns the first the error of the
        // first pattern that the value doesn't match
        var errorMatch = patternMatches.find(function (pattern) {
          if (!pattern.get('validator')(value)) return pattern.get('error');
        });
        return errorMatch === undefined ? null : errorMatch.get('error');
      }

      // Checks the validity of the value against the pattern, and returns an error if no match
      return patternMatches.get('validator')(value) ? null : patternMatches.get('error');
    }, _this._handleBlur = function (e) {
      if (_this.props.displayErrorOn === 'blur') _this.setState({ shouldDislayError: true });
      _this._submitValue(e);
    }, _this._handleChange = function (e) {
      if (_this.props.displayErrorOn === 'change') _this.setState({ shouldDislayError: true });
      _this._submitValue(e);
    }, _this._handleFocus = function (e) {
      // It only makes sense to hide the error on focus, if the error is displayed
      // on blur
      if (_this.props.displayErrorOn === 'blur') {
        _this.setState({ shouldDislayError: false });
      }
      _this._submitValue(e);
    }, _this._handleKeyDown = function (e) {
      if (e.which === ENTER) {
        var onEnterKeyPress = _this.props.onEnterKeyPress;


        if (onEnterKeyPress) onEnterKeyPress();
        _this._submitValue(e);
      }
    }, _this._submitValue = function (_ref) {
      var value = _ref.target.value;

      // If the input value doesn't match the regex we passed in, we're going to trigger an error callback
      var error = _this._getError(value) || null;
      // Updates the parent component with both the value and the error
      _this.props.onUpdate(value, error);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var autoFocus = _props.autoFocus;
      var className = _props.className;
      var disabled = _props.disabled;
      var error = _props.error;
      var errorType = _props.errorType;
      var inputClassName = _props.inputClassName;
      var label = _props.label;
      var labelIcon = _props.labelIcon;
      var required = _props.required;
      var type = _props.type;
      var value = _props.value;

      var inputLabel = labelIcon ? _react2.default.createElement(
        'span',
        null,
        labelIcon,
        label
      ) : label;
      var inputClasses = (0, _classnames2.default)(_Input2.default.input, inputClassName, disabled ? _Input2.default.disabled : null);

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, _Input2.default.main) },
        required && _react2.default.createElement(
          'span',
          { className: _Input2.default.requiredAsterisk },
          '*'
        ),
        _react2.default.createElement('input', {
          autoFocus: autoFocus,
          className: inputClasses,
          disabled: disabled,
          placeholder: inputLabel,
          onBlur: this._handleBlur,
          onChange: this._handleChange,
          onKeyDown: this._handleKeyDown,
          onFocus: this._handleFocus,
          type: type,
          value: value }),
        this._shouldRenderError() && _react2.default.createElement(_InputError2.default, { error: error, type: errorType })
      );
    }

    /**
     * Forces the `onUpdate` prop to be triggered. This is useful for when you need the latest and
     * most accurate error/value
     */


    /**
     * Returns whether or not the input field value is valid
     * @return {Boolean} - The validity of the field
     */


    /**
     * Checks it's provided value against the input field's `patternMatches` prop
     * and returns either an error or undefined
     * @param  {String} value - The value that we're validating
     * @return {String|Null} - The error string in `patternMatches` or null
     */


    /**
     * Checks to see if potential errors should be displayed and submits the input value every time the input blurs
     * @param  {Object} e - The blur event object
     */


    /**
     * Checks to see if potential errors should be displayed and submits the input value every time the value changes
     * @param  {Object} e - The change event object
     */


    /**
     * Forbids the input field from showing any errors and updates the parent component with it's value
     * @param  {Object} e - The focus event object
     */


    /**
     * Handles when the enter key is pressed
     * @param  {Object} e - The enter key press event
     */


    /**
     * Checks the input value, and submits it to the parent component, along with errors if there
     * are any.
     * @param  {Object} options    - The options argument
     * @param  {Object} options.target.value    - The event object that triggered the value submit
     */

  }]);

  return Input;
}(_react.Component), _class2.displayName = 'Input', _class2.propTypes = {
  autoFocus: _react.PropTypes.bool.isRequired,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool.isRequired,
  displayError: _react.PropTypes.bool.isRequired,
  displayErrorOn: _react.PropTypes.oneOf(['change', 'blur']).isRequired,
  error: _react.PropTypes.string,
  errorType: _react.PropTypes.oneOf(['error', 'warning']).isRequired,
  inputClassName: _react.PropTypes.string,
  label: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]).isRequired,
  labelIcon: _react.PropTypes.string,
  onEnterKeyPress: _react.PropTypes.func,
  onUpdate: _react.PropTypes.func.isRequired,
  patternMatches: _react.PropTypes.oneOfType([_reactImmutableProptypes2.default.listOf(_CustomPropTypes2.default.errorMatcher), _CustomPropTypes2.default.errorMatcher]).isRequired,
  required: _react.PropTypes.bool.isRequired,
  type: _react.PropTypes.oneOf(['text', 'email', 'number', 'password']),
  value: _react.PropTypes.string.isRequired
}, _class2.defaultProps = {
  autoFocus: false,
  disabled: false,
  displayError: false,
  displayErrorOn: 'blur',
  errorType: 'error',
  patternMatches: _immutable2.default.Map({
    error: '',
    validator: RETURN_TRUE
  }),
  required: false,
  type: 'text'
}, _temp2)) || _class;

exports.default = Input;