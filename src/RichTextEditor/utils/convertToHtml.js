import config from '../config';
import {stateToHTML} from 'draft-js-export-html';

const BLOCKQUOTE_OPENING_TAG_MATCHER = new RegExp('<blockquote>', 'g');

// An html transformer to add the proper styles to blockquotes
const styleBlockquotes = (html) => (
  html.replace(
    BLOCKQUOTE_OPENING_TAG_MATCHER,
    `<${config.text.blockquote.tag} style="${config.text.blockquote.style}">`
  )
);

export default (htmlTransformers = []) => (contentState, keepRaw) => {
  const rawHtml = stateToHTML(contentState);
  if (keepRaw) return rawHtml;
  
  let html = styleBlockquotes(rawHtml);

  // If the user has specified custom html transformers
  // (such as highlighting mark tags a specific way), we want
  // to apply them here
  htmlTransformers.forEach((transformer) => {
    html = transformer(html);
  });

  return html;
};
