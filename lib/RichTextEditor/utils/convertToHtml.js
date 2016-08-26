'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _draftJsExportHtml = require('draft-js-export-html');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BLOCKQUOTE_OPENING_TAG_MATCHER = new RegExp('<blockquote>', 'g');

// An html transformer to add the proper styles to blockquotes
var styleBlockquotes = function styleBlockquotes(html) {
  return html.replace(BLOCKQUOTE_OPENING_TAG_MATCHER, '<' + _config2.default.text.blockquote.tag + ' style="' + _config2.default.text.blockquote.style + '">');
};

exports.default = function (htmlTransformers) {
  return function (contentState, keepRaw) {
    var rawHtml = (0, _draftJsExportHtml.stateToHTML)(contentState);
    if (keepRaw) return rawHtml;

    var html = styleBlockquotes(rawHtml);

    // If the user has specified custom html transformers
    // (such as highlighting mark tags a specific way), we want
    // to apply them here
    (htmlTransformers || []).forEach(function (transformer) {
      html = transformer(html);
    });

    // The fully transformed HTML
    return html;
  };
};