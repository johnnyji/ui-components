import React, {Component} from 'react';
// import convertToContentState from './utils/convertToContentState';
// import convertToHtml from './utils/convertToHtml';
// import highlightWords from './utils/highlightWords';
import HighlightEditor from '../decorators/HighlightEditor';
import Immutable from 'immutable';
import RichTextEditor from '../RichTextEditor';
import styles from './index.scss';

const Editor = HighlightEditor(RichTextEditor);

export default class HighlightEditorDemo extends Component {

  static displayName = 'HighlightEditorDemo';

  state = {
    highlightWords: Immutable.List()
  };
  
  render() {
    return (
      <div>
        <label>Seperate highlight words by space</label>
        <input onChange={this._handleKeywordChange} placeholder="Keyword to highlight (space seperated)" />
        <Editor
          className={styles.Demo__editor}
          highlightWords={this.state.highlightWords} />
      </div>
    );
  }

  _handleKeywordChange = ({target: {value}}) => {
    this.setState({highlightWords: Immutable.List(value.split(' '))});
  };

}