'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _index = require('./index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegularInputDemo = (0, _pureRenderDecorator2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(RegularInputDemo, _Component);

  function RegularInputDemo() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RegularInputDemo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RegularInputDemo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      error: null,
      value: ''
    }, _this._handleUpdate = function (value, error) {
      _this.setState({ error: error, value: value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RegularInputDemo, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _index2.default.content },
        _react2.default.createElement(
          'div',
          { className: _index2.default.label },
          'Value: ',
          this.state.value
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.label },
          'Error: ',
          this.state.error
        ),
        _react2.default.createElement(_Input2.default, {
          className: _index2.default.input,
          error: this.state.error,
          label: 'Type here...',
          onUpdate: this._handleUpdate,
          value: this.state.value })
      );
    }
  }]);

  return RegularInputDemo;
}(_react.Component), _class2.displayName = 'RegularInputDemo', _temp2)) || _class;

exports.default = RegularInputDemo;