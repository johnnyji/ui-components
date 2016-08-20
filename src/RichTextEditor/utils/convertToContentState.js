import {convertFromHTML, ContentState} from 'draft-js';

export default (html) => ContentState.createFromBlockArray(convertFromHTML(html));