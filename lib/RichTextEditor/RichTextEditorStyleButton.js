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

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _RichTextEditorStyleButton = require('./RichTextEditorStyleButton.scss');

var _RichTextEditorStyleButton2 = _interopRequireDefault(_RichTextEditorStyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var blockStyleStyles = _config2.default.blockStyles.map(function (_ref) {
  var style = _ref.style;
  return style;
});
var blockStyleLabels = _config2.default.blockStyles.map(function (_ref2) {
  var label = _ref2.label;
  return label;
});
var inlineStyleStyles = _config2.default.inlineStyles.map(function (_ref3) {
  var style = _ref3.style;
  return style;
});
var inlineStyleLabels = _config2.default.inlineStyles.map(function (_ref4) {
  var label = _ref4.label;
  return label;
});

var RichTextEditorStyleButton = (0, _pureRenderDecorator2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(RichTextEditorStyleButton, _Component);

  function RichTextEditorStyleButton() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RichTextEditorStyleButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RichTextEditorStyleButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._handleClick = function (e) {
      // We need to prevent the default behaviour of the mousedown in
      // order to remain focus on the editor, otherwise clicking the button
      // doesn't apply inline styles
      e.preventDefault();
      _this.props.onToggle(_this.props.style);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RichTextEditorStyleButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var active = _props.active;
      var activeColor = _props.activeColor;
      var activeClassName = _props.activeClassName;
      var className = _props.className;
      var label = _props.label;

      var classes = (0, _classnames2.default)(_RichTextEditorStyleButton2.default.main, className, active ? activeClassName : null);

      return _react2.default.createElement(
        'button',
        {
          className: classes,
          onMouseDown: this._handleClick,
          style: activeColor ? { color: activeColor } : undefined },
        label
      );
    }
  }]);

  return RichTextEditorStyleButton;
}(_react.Component), _class2.displayName = 'RichTextEditorStyleButton', _class2.propTypes = {
  active: _react.PropTypes.bool.isRequired,
  activeColor: _react.PropTypes.string,
  activeClassName: _react.PropTypes.string,
  className: _react.PropTypes.string,
  label: _react.PropTypes.oneOf([].concat(_toConsumableArray(blockStyleLabels), _toConsumableArray(inlineStyleLabels))).isRequired,
  onToggle: _react.PropTypes.func.isRequired,
  style: _react.PropTypes.oneOf([].concat(_toConsumableArray(blockStyleStyles), _toConsumableArray(inlineStyleStyles))).isRequired
}, _class2.defaultProps = {
  activeClassName: _RichTextEditorStyleButton2.default.active
}, _temp2)) || _class;

exports.default = RichTextEditorStyleButton;