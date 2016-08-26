'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

exports.default = function (html) {
  return _draftJs.ContentState.createFromBlockArray((0, _draftJs.convertFromHTML)(html));
};