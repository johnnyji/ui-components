'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTabs = require('react-tabs');

var _Clickable = require('../Clickable');

var _Clickable2 = _interopRequireDefault(_Clickable);

var _DemoContent = require('./DemoContent');

var _DemoContent2 = _interopRequireDefault(_DemoContent);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _index = require('./index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DemoView = (0, _pureRenderDecorator2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(DemoView, _Component);

  function DemoView() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DemoView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DemoView)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      selectedIndex: 0
    }, _this._goHome = function () {
      _this.context.router.push('/');
    }, _this._handleSelect = function (index) {
      _this.setState({ selectedIndex: index });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DemoView, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _index2.default.main },
        _react2.default.createElement(
          _Clickable2.default,
          { onClick: this._goHome },
          'Home'
        ),
        _react2.default.createElement(
          _reactTabs.Tabs,
          {
            className: _index2.default.tabs,
            onSelect: this._handleSelect,
            selectedIndex: this.state.selectedIndex },
          _react2.default.createElement(
            _reactTabs.TabList,
            null,
            this.props.demoViews.map(function (_ref, i) {
              var title = _ref.title;
              return _react2.default.createElement(
                _reactTabs.Tab,
                { key: i },
                title
              );
            })
          ),
          this.props.demoViews.map(function (_ref2, i) {
            var component = _ref2.component;
            return _react2.default.createElement(
              _reactTabs.TabPanel,
              { className: _index2.default.panel, key: i },
              _react2.default.createElement(_DemoContent2.default, { component: component })
            );
          })
        )
      );
    }
  }]);

  return DemoView;
}(_react.Component), _class2.displayName = 'DemoView', _class2.propTypes = {
  demoViews: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    component: _react.PropTypes.func.isRequired,
    title: _react.PropTypes.string.isRequired
  }).isRequired).isRequired
}, _class2.contextTypes = {
  router: _react.PropTypes.shape({
    push: _react.PropTypes.func.isRequired
  }).isRequired
}, _temp2)) || _class;

exports.default = DemoView;