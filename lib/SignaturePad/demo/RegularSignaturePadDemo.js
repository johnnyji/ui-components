'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _SignaturePad = require('../SignaturePad');

var _SignaturePad2 = _interopRequireDefault(_SignaturePad);

var _index = require('./index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegularSignaturePadDemo = (0, _pureRenderDecorator2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(RegularSignaturePadDemo, _Component);

  function RegularSignaturePadDemo() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RegularSignaturePadDemo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RegularSignaturePadDemo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      error: null
    }, _this._handleSignature = function (signature) {
      if (!signature) {
        _this.setState({ error: 'Please sign before you submit!' });
        return;
      }
      _this.setState({ error: null });
      window.open(signature);
    }, _this._handleClearError = function () {
      _this.setState({ error: null });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RegularSignaturePadDemo, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _index2.default.main },
        _react2.default.createElement(_SignaturePad2.default, {
          label: this.state.error || 'Sign here!',
          onClear: this._handleClearError,
          onSigning: this._handleClearError,
          onSubmit: this._handleSignature })
      );
    }
  }]);

  return RegularSignaturePadDemo;
}(_react.Component), _class2.displayName = 'RegularSignaturePadDemo', _temp2)) || _class;

exports.default = RegularSignaturePadDemo;