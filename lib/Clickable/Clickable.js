'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Clickable = require('./Clickable.scss');

var _Clickable2 = _interopRequireDefault(_Clickable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clickable = (_temp = _class = function (_Component) {
  _inherits(Clickable, _Component);

  function Clickable() {
    _classCallCheck(this, Clickable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Clickable).apply(this, arguments));
  }

  _createClass(Clickable, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var disabled = _props.disabled;
      var onClick = _props.onClick;

      var classes = (0, _classnames2.default)(_Clickable2.default.main, className, disabled ? _Clickable2.default.disabled : null);

      return _react2.default.createElement(
        'button',
        {
          className: classes,
          onClick: onClick },
        children
      );
    }
  }]);

  return Clickable;
}(_react.Component), _class.displayName = 'Clickable', _class.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool.isRequired,
  onClick: _react.PropTypes.func.isRequired
}, _class.defaultProps = {
  disabled: false
}, _temp);
exports.default = Clickable;