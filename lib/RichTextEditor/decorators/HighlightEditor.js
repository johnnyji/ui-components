'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createRegexFromWords = require('../utils/createRegexFromWords');

var _createRegexFromWords2 = _interopRequireDefault(_createRegexFromWords);

var _CustomPropTypes = require('../utils/CustomPropTypes');

var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

var _findWithRegex = require('../utils/findWithRegex');

var _findWithRegex2 = _interopRequireDefault(_findWithRegex);

var _HighlightedWord = require('../HighlightedWord');

var _HighlightedWord2 = _interopRequireDefault(_HighlightedWord);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Finds each instance of a word in the contentBlock that matches the regex,
// and then fires the callback for each found word, so it can be replaced by our custom HighlightedWord
// component
var highlightWordStrategy = function highlightWordStrategy(regex) {
  return function (contentBlock, cb) {
    (0, _findWithRegex2.default)(regex, contentBlock.getText(), cb);
  };
};

exports.default = function (ComposedEditorComponent) {
  var _class, _temp, _initialiseProps;

  return _temp = _class = function (_Component) {
    _inherits(HighlightEditor, _Component);

    function HighlightEditor(props) {
      _classCallCheck(this, HighlightEditor);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HighlightEditor).call(this, props));

      _initialiseProps.call(_this);

      _this.state = {
        decorators: _this._combineDecorators(props)
      };
      return _this;
    }

    _createClass(HighlightEditor, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _props = this.props;
        var decorators = _props.decorators;
        var words = _props.highlightWords;
        var nextDecorators = nextProps.decorators;
        var nextWords = nextProps.highlightWords;


        if (!_immutable2.default.is(words, nextWords) || !_immutable2.default.is(decorators, nextDecorators)) {
          this.setState({ decorators: this._combineDecorators(nextProps) });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        /* eslint-disable no-unused-vars */
        var _props2 = this.props;
        var decorators = _props2.decorators;
        var highlightWords = _props2.highlightWords;

        var restProps = _objectWithoutProperties(_props2, ['decorators', 'highlightWords']);
        /* eslint-enable no-unused-vars */

        return _react2.default.createElement(ComposedEditorComponent, _extends({}, restProps, {
          decorators: this.state.decorators }));
      }
    }]);

    return HighlightEditor;
  }(_react.Component), _class.displayName = 'HighlightEditor', _class.propTypes = {
    decorators: _CustomPropTypes2.default.decorators.isRequired,
    highlightWords: _reactImmutableProptypes2.default.listOf(_react.PropTypes.string).isRequired
  }, _class.defaultProps = {
    decorators: _immutable2.default.List(),
    highlightWords: _immutable2.default.List()
  }, _initialiseProps = function _initialiseProps() {
    this._combineDecorators = function (props) {
      // This makes sure that no empty strings are considered highlight words
      var validHighlightWords = props.highlightWords.filter(function (w) {
        return w !== '';
      });

      // If there are no words to highlight, just return the existing decorators
      if (!validHighlightWords.size) return props.decorators;

      var regex = (0, _createRegexFromWords2.default)(validHighlightWords);
      var highlightDecorator = {
        strategy: highlightWordStrategy(regex),
        component: _HighlightedWord2.default
      };

      return props.decorators.push(highlightDecorator);
    };
  }, _temp;
};