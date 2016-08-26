'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _InputError = require('./InputError.scss');

var _InputError2 = _interopRequireDefault(_InputError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputError = (0, _pureRenderDecorator2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(InputError, _Component);

  function InputError() {
    _classCallCheck(this, InputError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(InputError).apply(this, arguments));
  }

  _createClass(InputError, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var error = _props.error;
      var type = _props.type;

      var classes = (0, _classnames2.default)(_InputError2.default.main, _InputError2.default[type]);

      return _react2.default.createElement(
        'div',
        { className: classes },
        error
      );
    }
  }]);

  return InputError;
}(_react.Component), _class2.displayName = 'InputError', _class2.propTypes = {
  error: _react.PropTypes.string.isRequired,
  type: _react.PropTypes.oneOf(['error', 'warning']).isRequired
}, _temp)) || _class;

exports.default = InputError;