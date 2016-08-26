'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmail = require('validator/lib/isEmail');

var _isEmail2 = _interopRequireDefault(_isEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  email: function email(error) {
    return {
      error: error || 'Please enter a valid email address.',
      validator: _isEmail2.default
    };
  },
  matchValue: function matchValue(valueToMatch, error) {
    return {
      error: error || 'Value must match: ' + valueToMatch + '.',
      validator: function validator() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return new RegExp('^' + valueToMatch + '$').test(value);
      }
    };
  },
  minLength: function minLength(length, error) {
    return {
      error: error || 'Must be at least ' + length + ' characters.',
      validator: function validator() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return value.length >= length;
      }
    };
  },
  maxLength: function maxLength(length, error) {
    return {
      error: error || 'Must be less than ' + length + ' characters.',
      validator: function validator() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return value.length <= length;
      }
    };
  },
  minMaxLength: function minMaxLength(min, max, error) {
    return {
      error: error || 'Must be between ' + min + ' and ' + max + ' characters.',
      validator: function validator() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return value.length <= max && value.length >= min;
      }
    };
  },
  noLowerCase: function noLowerCase(error) {
    return {
      error: error || 'No lower case characters allowed.',
      validator: function validator() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        return (/^[^a-z]*$/.test(value)
        );
      }
    };
  }
};