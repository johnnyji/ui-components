'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  decorators: _reactImmutableProptypes2.default.listOf(_react.PropTypes.shape({
    component: _react.PropTypes.func.isRequired,
    strategy: _react.PropTypes.func.isRequired
  }))

};