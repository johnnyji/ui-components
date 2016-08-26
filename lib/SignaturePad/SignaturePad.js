'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _Clickable = require('../Clickable');

var _Clickable2 = _interopRequireDefault(_Clickable);

var _signature_pad = require('signature_pad');

var _signature_pad2 = _interopRequireDefault(_signature_pad);

var _SignaturePad = require('./SignaturePad.scss');

var _SignaturePad2 = _interopRequireDefault(_SignaturePad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignaturePad = (_temp2 = _class = function (_Component) {
  _inherits(SignaturePad, _Component);

  function SignaturePad() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SignaturePad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SignaturePad)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._handleClear = function () {
      _this.signaturePad.clear();
      if (_this.props.onClear) _this.props.onClear();
    }, _this._handleSigning = function () {
      if (_this.props.onSigning) _this.props.onSigning();
    }, _this._handleSubmit = function () {
      if (_this.signaturePad._isEmpty) {
        _this.props.onSubmit();
        return;
      }

      _this.props.onSubmit(_this.signaturePad.toDataURL());
    }, _this._debouncedSizeCanvas = function () {
      return (0, _debounce2.default)(_this._sizeCanvas, 10);
    }, _this._sizeCanvas = function () {
      var _this$refs = _this.refs;
      var canvas = _this$refs.canvas;
      var canvasWrapper = _this$refs.canvasWrapper;

      var wrapperDimensions = canvasWrapper.getBoundingClientRect();

      // Make sure the canvas the same dimensions as its wrapper.
      // `canvas` elements must have its dimensions set programmatically like so
      canvas.height = wrapperDimensions.height;
      canvas.width = wrapperDimensions.width;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SignaturePad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('onresize', this._debouncedSizeCanvas);

      this._sizeCanvas();
      this.signaturePad = new _signature_pad2.default(this.refs.canvas);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('onresize', this._debouncedSizeCanvas);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var label = _props.label;
      var resetLabel = _props.resetLabel;
      var submitLabel = _props.submitLabel;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_SignaturePad2.default.main, className) },
        _react2.default.createElement(
          'div',
          { className: _SignaturePad2.default.pad, ref: 'canvasWrapper' },
          _react2.default.createElement('canvas', { onMouseDown: this._handleSigning, ref: 'canvas' })
        ),
        _react2.default.createElement(
          'footer',
          { className: _SignaturePad2.default.footer },
          _react2.default.createElement(
            _Clickable2.default,
            { onClick: this._handleClear },
            resetLabel
          ),
          label && _react2.default.createElement(
            'div',
            { className: _SignaturePad2.default.label },
            label
          ),
          _react2.default.createElement(
            _Clickable2.default,
            { onClick: this._handleSubmit },
            submitLabel
          )
        )
      );
    }
  }]);

  return SignaturePad;
}(_react.Component), _class.displayName = 'SignaturePad', _class.propTypes = {
  className: _react.PropTypes.string,
  label: _react.PropTypes.string,
  onClear: _react.PropTypes.func,
  onSigning: _react.PropTypes.func,
  onSubmit: _react.PropTypes.func.isRequired,
  resetLabel: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]).isRequired,
  submitLabel: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]).isRequired
}, _class.defaultProps = {
  resetLabel: 'Clear',
  submitLabel: 'Submit'
}, _temp2);
exports.default = SignaturePad;