'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2; /* eslint-disable react/no-danger */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _convertToHtml = require('../utils/convertToHtml');

var _convertToHtml2 = _interopRequireDefault(_convertToHtml);

var _HighlightEditor = require('../decorators/HighlightEditor');

var _HighlightEditor2 = _interopRequireDefault(_HighlightEditor);

var _highlightWords = require('../utils/highlightWords');

var _highlightWords2 = _interopRequireDefault(_highlightWords);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _Input = require('../../Input');

var _Input2 = _interopRequireDefault(_Input);

var _RichTextEditor = require('../RichTextEditor');

var _RichTextEditor2 = _interopRequireDefault(_RichTextEditor);

var _index = require('./index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styleHighlightTags = function styleHighlightTags(hex) {
  return function (html) {
    return html.replace(/<mark>/g, '<mark style="background-color: ' + hex + ';">');
  };
};

var Editor = (0, _HighlightEditor2.default)(_RichTextEditor2.default);

var HighlightEditorDemo = (_temp2 = _class = function (_Component) {
  _inherits(HighlightEditorDemo, _Component);

  function HighlightEditorDemo() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, HighlightEditorDemo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HighlightEditorDemo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hex: '#F5D76E',
      highlightWords: _immutable2.default.List(),
      highlightWordsString: '',
      html: '',
      rawHtml: ''
    }, _this._handleUpdate = function (content) {
      // HTML Before we add styles to the mark tags
      var rawHtml = (0, _convertToHtml2.default)()(content);
      rawHtml = (0, _highlightWords2.default)(rawHtml, _this.state.highlightWords, 'mark');
      // HTML After we add styles to mark tags
      var html = styleHighlightTags(_this.state.hex)(rawHtml);

      _this.setState({
        html: html,
        rawHtml: rawHtml
      });
    }, _this._handleKeywordChange = function (value) {
      var words = _immutable2.default.List(value.split(' '));
      _this.setState({
        highlightWordsString: value,
        highlightWords: words
      });
    }, _this._handlePickColor = function (e) {
      var hex = e.target.value.toUpperCase();

      _this.setState({
        hex: hex,
        html: styleHighlightTags(hex)(_this.state.rawHtml)
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HighlightEditorDemo, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _index2.default.content },
        _react2.default.createElement(
          'div',
          { className: _index2.default.HighlightEditorDemo__section },
          _react2.default.createElement(
            'h3',
            null,
            'Rich Text Editor'
          ),
          _react2.default.createElement(_Input2.default, {
            onUpdate: this._handleKeywordChange,
            label: 'Keyword to highlight (space seperated)',
            value: this.state.highlightWordsString }),
          _react2.default.createElement(Editor, {
            className: _index2.default.Demo__editor,
            highlightWords: this.state.highlightWords,
            onUpdate: this._handleUpdate,
            ref: 'editor' })
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.HighlightEditorDemo__section },
          _react2.default.createElement(
            'h3',
            null,
            'Content Editable Output'
          ),
          _react2.default.createElement(
            'label',
            null,
            'Current highlight color: ',
            this.state.hex
          ),
          _react2.default.createElement('input', { type: 'color', value: this.state.hex, onChange: this._handlePickColor }),
          _react2.default.createElement('div', {
            className: _index2.default.Demo__html,
            dangerouslySetInnerHTML: { __html: this.state.html } })
        )
      );
    }
  }]);

  return HighlightEditorDemo;
}(_react.Component), _class.displayName = 'HighlightEditorDemo', _temp2);
/* eslint-enable react/no-danger */

exports.default = HighlightEditorDemo;