'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _ComponentsListing = require('./ComponentsListing.scss');

var _ComponentsListing2 = _interopRequireDefault(_ComponentsListing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComponentsListing = (0, _pureRenderDecorator2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(ComponentsListing, _Component);

  function ComponentsListing() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ComponentsListing);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ComponentsListing)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._renderComponentsList = function () {
      return _components2.default.map(function (component, i) {
        return _react2.default.createElement(
          'button',
          {
            className: _ComponentsListing2.default.item,
            key: i,
            onClick: function onClick() {
              return _this._handleClick(component);
            } },
          component
        );
      });
    }, _this._handleClick = function (component) {
      _this.context.router.push('/components/' + component);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ComponentsListing, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _ComponentsListing2.default.main },
        _react2.default.createElement(
          'h1',
          { className: _ComponentsListing2.default.title },
          'UI Components'
        ),
        _react2.default.createElement(
          'div',
          { className: _ComponentsListing2.default.list },
          this._renderComponentsList()
        )
      );
    }
  }]);

  return ComponentsListing;
}(_react.Component), _class2.displayName = 'ComponentsListing', _class2.contextTypes = {
  router: _react.PropTypes.shape({
    push: _react.PropTypes.func.isRequired
  }).isRequired
}, _temp2)) || _class;

exports.default = ComponentsListing;