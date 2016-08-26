'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _draftJs = require('draft-js');

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _RichTextEditorStyleButton = require('./RichTextEditorStyleButton');

var _RichTextEditorStyleButton2 = _interopRequireDefault(_RichTextEditorStyleButton);

var _RichTextEditorHeader = require('./RichTextEditorHeader.scss');

var _RichTextEditorHeader2 = _interopRequireDefault(_RichTextEditorHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichTextEditorHeader = (0, _pureRenderDecorator2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(RichTextEditorHeader, _Component);

  function RichTextEditorHeader() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RichTextEditorHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RichTextEditorHeader)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._renderBlockStyles = function () {
      var _this$props = _this.props;
      var activeColor = _this$props.activeColor;
      var editorState = _this$props.editorState;
      var onToggleBlockType = _this$props.onToggleBlockType;

      var blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();

      return _config2.default.blockStyles.map(function (_ref) {
        var label = _ref.label;
        var style = _ref.style;
        return _react2.default.createElement(_RichTextEditorStyleButton2.default, {
          active: blockType === style,
          activeColor: activeColor,
          className: _RichTextEditorHeader2.default['control' + style],
          label: label,
          onToggle: onToggleBlockType,
          style: style,
          key: style });
      });
    }, _this._renderInlineStyles = function () {
      var _this$props2 = _this.props;
      var activeColor = _this$props2.activeColor;
      var editorState = _this$props2.editorState;
      var onToggleInlineStyle = _this$props2.onToggleInlineStyle;

      var currentInlineStyle = editorState.getCurrentInlineStyle();

      return _config2.default.inlineStyles.map(function (_ref2) {
        var label = _ref2.label;
        var style = _ref2.style;
        return _react2.default.createElement(_RichTextEditorStyleButton2.default, {
          active: currentInlineStyle.has(style),
          activeColor: activeColor,
          className: _RichTextEditorHeader2.default['control' + style],
          label: label,
          onToggle: onToggleInlineStyle,
          style: style,
          key: style });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RichTextEditorHeader, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'header',
        { className: _RichTextEditorHeader2.default.main },
        this._renderInlineStyles(),
        this._renderBlockStyles()
      );
    }
  }]);

  return RichTextEditorHeader;
}(_react.Component), _class2.displayName = 'RichTextEditorHeader', _class2.propTypes = {
  activeColor: _react.PropTypes.string,
  editorState: _react.PropTypes.instanceOf(_draftJs.EditorState).isRequired,
  onToggleBlockType: _react.PropTypes.func.isRequired,
  onToggleInlineStyle: _react.PropTypes.func.isRequired
}, _temp2)) || _class;

exports.default = RichTextEditorHeader;