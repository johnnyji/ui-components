'use strict';

require('babel-polyfill');

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _index = require('./Clickable/demo/index');

var _index2 = _interopRequireDefault(_index);

var _ComponentsListing = require('./ComponentsListing');

var _ComponentsListing2 = _interopRequireDefault(_ComponentsListing);

var _Demo = require('./Demo');

var _Demo2 = _interopRequireDefault(_Demo);

var _index3 = require('./Input/demo/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./RichTextEditor/demo/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./SignaturePad/demo/index');

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Have to use hashHistory due to no server
var routes = _react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.hashHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { component: _App2.default, path: '/' },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _ComponentsListing2.default }),
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _Demo2.default, path: 'components' },
      _react2.default.createElement(_reactRouter.Route, { component: _index2.default, path: 'Clickable' }),
      _react2.default.createElement(_reactRouter.Route, { component: _index4.default, path: 'Input' }),
      _react2.default.createElement(_reactRouter.Route, { component: _index6.default, path: 'RichTextEditor' }),
      _react2.default.createElement(_reactRouter.Route, { component: _index8.default, path: 'SignaturePad' })
    )
  )
);

(0, _reactDom.render)(routes, document.getElementById('ui-components'));