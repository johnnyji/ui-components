/* eslint-disable react/no-danger */
import React, {Component} from 'react';
import convertToHtml from '../utils/convertToHtml';
import HighlightEditor from '../decorators/HighlightEditor';
import highlightWords from '../utils/highlightWords';
import Immutable from 'immutable';
import Input from '../../Input';
import RichTextEditor from '../RichTextEditor';
import styles from './index.scss';

const styleHighlightTags = (hex) => (html) => {
  return html.replace(/<mark>/g, `<mark style="background-color: ${hex};">`);
};

const Editor = HighlightEditor(RichTextEditor);

export default class HighlightEditorDemo extends Component {

  static displayName = 'HighlightEditorDemo';

  state = {
    hex: '#F5D76E',
    highlightWords: Immutable.List(),
    highlightWordsString: '',
    html: '',
    rawHtml: ''
  };

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.HighlightEditorDemo__section}>
          <h3>Rich Text Editor</h3>
          <Input
            onUpdate={this._handleKeywordChange}
            label="Keyword to highlight (space seperated)"
            value={this.state.highlightWordsString} />
          <Editor
            className={styles.Demo__editor}
            highlightWords={this.state.highlightWords}
            onUpdate={this._handleUpdate}
            ref="editor" />
        </div>
        <div className={styles.HighlightEditorDemo__section}>
          <h3>Content Editable Output</h3>
          <label>Current highlight color: {this.state.hex}</label>
          <input type='color' value={this.state.hex} onChange={this._handlePickColor} />
          <div
            className={styles.Demo__html}
            dangerouslySetInnerHTML={{__html: this.state.html}}>
          </div>
        </div>
      </div>
    );
  }

  _handleUpdate = (content) => {
    // HTML Before we add styles to the mark tags
    let rawHtml = convertToHtml()(content);
    rawHtml = highlightWords(rawHtml, this.state.highlightWords, 'mark');
    // HTML After we add styles to mark tags
    const html = styleHighlightTags(this.state.hex)(rawHtml);

    this.setState({
      html,
      rawHtml
    });
  };

  _handleKeywordChange = (value) => {
    const words = Immutable.List(value.split(' '));
    this.setState({
      highlightWordsString: value,
      highlightWords: words,
    });
  };

  _handlePickColor = (e) => {
    const hex = e.target.value.toUpperCase();

    this.setState({
      hex,
      html: styleHighlightTags(hex)(this.state.rawHtml)
    });
  };

}
/* eslint-enable react/no-danger */
