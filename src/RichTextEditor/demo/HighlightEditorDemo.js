/* eslint-disable react/no-danger */
import React, {PureComponent} from 'react';
import Button from '../../Button/Button';
import convertToHtml from '../utils/convertToHtml';
import HighlightEditor from '../decorators/HighlightEditor';
import highlightWords from '../utils/highlightWords';
import Input from '../../Input';
import {List} from 'immutable';
import RichTextEditor from '../RichTextEditor';
import styles from './index.scss';

const styleHighlightTags = (hex) => (html) => {
  return html.replace(/<mark>/g, `<mark style="background-color: ${hex};">`);
};

const Editor = HighlightEditor(RichTextEditor);

export default class HighlightEditorDemo extends PureComponent {

  static displayName = 'HighlightEditorDemo';

  state = {
    hex: '#F5D76E',
    highlightWords: List(),
    highlightWordsString: '',
    html: '',
    outputMode: 'ce',
    rawHtml: ''
  };

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.HighlightEditorDemo__section}>
          <h2>Rich Text Editor</h2>
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
          <h2>
            Editor Output
            <Button
              active={this.state.outputMode === 'ce'}
              className={styles.button}
              name='ce'
              onClick={this._handleMode}>
              Content Editable
            </Button>
            <Button
              active={this.state.outputMode === 'html'}
              className={styles.button}
              name='html'
              onClick={this._handleMode}>
              HTML
            </Button>
          </h2>
          {this.state.outputMode === 'ce' ? this._renderContentEditable() : this._renderHtml()}
        </div>
      </div>
    );
  }

  _renderContentEditable = () => {
    return (
      <div>
        <label>Current highlight color: {this.state.hex}</label>
        <input type='color' value={this.state.hex} onChange={this._handlePickColor} />
        <div
          className={styles.Demo__html}
          dangerouslySetInnerHTML={{__html: this.state.html}}>
        </div>
      </div>
    );
  };

  _renderHtml = () => {
    return (
      <div className={styles.Demo__html}>
        {this.state.html}
      </div>
    );
  };

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
    const words = List(value.split(' '));
    this.setState({
      highlightWordsString: value,
      highlightWords: words,
    });
  };

  _handleMode = (mode) => {
    this.setState({outputMode: mode});
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
