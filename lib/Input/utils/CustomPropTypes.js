'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  errorMatcher: _reactImmutableProptypes2.default.mapContains({
    error: _react.PropTypes.string.isRequired,
    validator: _react.PropTypes.func.isRequired
  })

};