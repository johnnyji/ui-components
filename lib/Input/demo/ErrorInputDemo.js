'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _index = require('./index.scss');

var _index2 = _interopRequireDefault(_index);

var _validators = require('../utils/validators');

var _validators2 = _interopRequireDefault(_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorInputDemo = (0, _pureRenderDecorator2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(ErrorInputDemo, _Component);

  function ErrorInputDemo() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ErrorInputDemo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ErrorInputDemo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      error: null,
      value: ''
    }, _this._handleUpdate = function (value, error) {
      _this.setState({ error: error, value: value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ErrorInputDemo, [{
    key: 'render',
    value: function render() {
      var patternMatcher = _immutable2.default.fromJS([_validators2.default.minMaxLength(3, 10, 'Must be between 3 and 10 characters. This is also a super long error to show how it would wrap.'), _validators2.default.noLowerCase()]);

      return _react2.default.createElement(
        'div',
        { className: _index2.default.main },
        _react2.default.createElement(
          'div',
          { className: _index2.default.content },
          _react2.default.createElement(
            'div',
            { className: _index2.default.label },
            'Error on change:'
          ),
          _react2.default.createElement(_Input2.default, {
            className: _index2.default.input,
            displayErrorOn: 'change',
            error: this.state.error,
            label: 'Type here...',
            onUpdate: this._handleUpdate,
            patternMatches: patternMatcher,
            value: this.state.value })
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.content },
          _react2.default.createElement(
            'div',
            { className: _index2.default.label },
            'Error on blur:'
          ),
          _react2.default.createElement(_Input2.default, {
            className: _index2.default.input,
            displayErrorOn: 'blur',
            error: this.state.error,
            label: 'Type here...',
            onUpdate: this._handleUpdate,
            patternMatches: patternMatcher,
            value: this.state.value })
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.content },
          _react2.default.createElement(
            'div',
            { className: _index2.default.label },
            'Always show error:'
          ),
          _react2.default.createElement(_Input2.default, {
            className: _index2.default.input,
            displayError: true,
            error: this.state.error,
            label: 'Type here...',
            onUpdate: this._handleUpdate,
            patternMatches: patternMatcher,
            value: this.state.value })
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.content },
          _react2.default.createElement(
            'div',
            { className: _index2.default.label },
            'Warning color:'
          ),
          _react2.default.createElement(_Input2.default, {
            className: _index2.default.input,
            displayError: true,
            error: this.state.error,
            errorType: 'warning',
            label: 'Type here...',
            onUpdate: this._handleUpdate,
            patternMatches: patternMatcher,
            value: this.state.value })
        )
      );
    }
  }]);

  return ErrorInputDemo;
}(_react.Component), _class2.displayName = 'ErrorInputDemo', _temp2)) || _class;

exports.default = ErrorInputDemo;