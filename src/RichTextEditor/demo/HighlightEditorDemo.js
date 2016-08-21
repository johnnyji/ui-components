import React, {Component} from 'react';
import convertToHtml from '../utils/convertToHtml';
import HighlightEditor from '../decorators/HighlightEditor';
import highlightWords from '../utils/highlightWords';
import Immutable from 'immutable';
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
    html: '',
    rawHtml: ''
  };

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.HighlightEditorDemo__section}>
          <h1>Rich Text Editor</h1>
          <label>Seperate highlight words by space</label>
          <input onChange={this._handleKeywordChange} placeholder="Keyword to highlight (space seperated)" />
          <Editor
            className={styles.Demo__editor}
            highlightWords={this.state.highlightWords}
            onStopTyping={this._handleStopTyping}
            ref="editor" />
        </div>
        <div className={styles.HighlightEditorDemo__section}>
          <h1>Content Editable Output</h1>
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

  _handleStopTyping = (content) => {
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

  _handleKeywordChange = ({target: {value}}) => {
    this.setState({highlightWords: Immutable.List(value.split(' '))});
  };

  _handlePickColor = (e) => {
    const hex = e.target.value.toUpperCase();

    this.setState({
      hex,
      html: styleHighlightTags(hex)(this.state.rawHtml)
    });
  };

}