import React, {Component} from 'react';
import convertToContentState from './utils/convertToContentState';
import convertToHtml from './utils/convertToHtml';
import highlightWords from './utils/highlightWords';
import RichTextEditor from './index';

const styles = {
  wrapper: {
    height: 600,
    width: 400
  }
};

export default class Demo extends Component {

  static displayName = 'RichTextEditor-demo';

  state = {
    highlightKeyword: null
  };
  
  render() {
    return (
      <div style={styles.wrapper}>
        <input onChange={this._handleKeywordChange} placeholder="Keyword to highlight" />
        <RichTextEditor
          onStopTyping={this._handleStopTyping} />
      </div>
    );
  }

  _handleKeywordChange = ({target: {value}}) => {
    this.setState({highlightKeyword: value});
  };

  _handleStopTyping = (contentState) => {
    const html = convertToHtml(contentState);
    const highlightedHtml = highlightWords(html, [this.state.highlightKeyword]);
    console.log(this.state.highlightKeyword);
    console.log(highlightedHtml);
    this.setState({content: convertToContentState(highlightedHtml)});
  };

}