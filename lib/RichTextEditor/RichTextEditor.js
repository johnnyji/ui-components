'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CustomPropTypes = require('./utils/CustomPropTypes');

var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _onstop = require('onstop');

var _onstop2 = _interopRequireDefault(_onstop);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _RichTextEditorHeader = require('./RichTextEditorHeader');

var _RichTextEditorHeader2 = _interopRequireDefault(_RichTextEditorHeader);

var _RichTextEditor = require('./RichTextEditor.scss');

var _RichTextEditor2 = _interopRequireDefault(_RichTextEditor);

var _textStyles = require('./textStyles.scss');

var _textStyles2 = _interopRequireDefault(_textStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichTextEditor = (0, _pureRenderDecorator2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(RichTextEditor, _Component);

  function RichTextEditor(props) {
    _classCallCheck(this, RichTextEditor);

    // Composing decorators that enhance functionality on the editor

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RichTextEditor).call(this, props));

    _this.getContent = function () {
      return _this.state.editorState.getCurrentContent();
    };

    _this._renderBlockStyles = function (contentBlock) {
      switch (contentBlock.getType()) {
        case 'blockquote':
          return _textStyles2.default.blockquote;
        default:
          return null;
      }
    };

    _this._handleFocus = function () {
      _this.Editor.focus();
    };

    _this._handleToggleBlockType = function (blockType) {
      _this._handleChange(_draftJs.RichUtils.toggleBlockType(_this.state.editorState, blockType));
    };

    _this._handleToggleInlineStyle = function (style) {
      _this._handleChange(_draftJs.RichUtils.toggleInlineStyle(_this.state.editorState, style));
    };

    _this._handleChange = function (editorState) {
      _this.setState({ editorState: editorState });
      if (_this.props.onUpdate) _this.props.onUpdate(editorState.getCurrentContent());
    };

    _this._handleKeyCommand = function (command) {
      var newState = _draftJs.RichUtils.handleKeyCommand(_this.state.editorState, command);

      if (newState) {
        _this._handleChange(newState);
        return true;
      }
      return false;
    };

    _this._handleStopTyping = function () {
      _this.props.onStopTyping(_this.state.editorState.getCurrentContent());
    };

    _this._setEditorRef = function (node) {
      _this.Editor = node;
    };

    var decorators = !props.decorators.size ? undefined : new _draftJs.CompositeDecorator(props.decorators.toArray());

    _this.state = {
      editorState: props.defaultContent ? _draftJs.EditorState.createWithContent(props.defaultContent, decorators) : _draftJs.EditorState.createEmpty(decorators)
    };

    _this._onStopTyping = (0, _onstop2.default)(props.onStopTypingTimeout, _this._handleStopTyping);
    return _this;
  }

  _createClass(RichTextEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var decorators = this.props.decorators;
      var nextDecorators = nextProps.decorators;

      // If the decorators have changed, we need to update them

      if (!_immutable2.default.is(decorators, nextDecorators)) {
        var editorState = this.state.editorState;

        var newDecorator = new _draftJs.CompositeDecorator(nextDecorators.toArray());
        this.setState({ editorState: _draftJs.EditorState.set(editorState, { decorator: newDecorator }) });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onStopTyping) {
        this.Editor.refs.editorContainer.addEventListener('keyup', this._onStopTyping);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.Editor.refs.editorContainer.removeEventListener('keyup', this._onStopTyping);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var activeColor = _props.activeColor;
      var className = _props.className;
      var enableRich = _props.enableRich;
      var placeholder = _props.placeholder;
      var editorState = this.state.editorState;

      var content = editorState.getCurrentContent();
      var emptyAndStyled = !content.hasText() && content.getBlockMap().first().getType() !== 'unstyled';

      // If the user changes block type before entering any text, we need
      // to hide the placeholder
      var editorClassNames = (0, _classnames2.default)(_RichTextEditor2.default.editor, emptyAndStyled ? _RichTextEditor2.default.hidePlaceholder : null);

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, _RichTextEditor2.default.main) },
        enableRich && _react2.default.createElement(_RichTextEditorHeader2.default, {
          activeColor: activeColor,
          editorState: editorState,
          onToggleBlockType: this._handleToggleBlockType,
          onToggleInlineStyle: this._handleToggleInlineStyle }),
        _react2.default.createElement(
          'div',
          { className: editorClassNames, onClick: this._handleFocus },
          _react2.default.createElement(_draftJs.Editor, {
            blockStyleFn: this._renderBlockStyles,
            editorState: editorState,
            handleKeyCommand: this._handleKeyCommand,
            onChange: this._handleChange,
            placeholder: placeholder,
            ref: this._setEditorRef,
            spellCheck: true })
        )
      );
    }
  }]);

  return RichTextEditor;
}(_react.Component), _class2.displayName = 'RichTextEditor', _class2.propTypes = {
  activeColor: _react.PropTypes.string,
  className: _react.PropTypes.string,
  enableRich: _react.PropTypes.bool.isRequired,
  decorators: _CustomPropTypes2.default.decorators,
  defaultContent: _react.PropTypes.instanceOf(_draftJs.ContentState),
  onStopTyping: _react.PropTypes.func,
  onStopTypingTimeout: _react.PropTypes.number,
  onUpdate: _react.PropTypes.func,
  placeholder: _react.PropTypes.string.isRequired
}, _class2.defaultProps = {
  enableRich: true,
  decorators: _immutable2.default.List(),
  onStopTypingTimeout: 300,
  placeholder: 'Start typing here...'
}, _temp)) || _class;

exports.default = RichTextEditor;