import React, {Component, PropTypes} from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import classNames from 'classnames';
import inlineStyles from './utils/inlineStyles';
import pureRender from 'pure-render-decorator';
import RichTextEditorStyleButton from './RichTextEditorStyleButton';
import styles from './RichTextEditor.scss';

@pureRender
export default class RichTextEditor extends Component {

  static displayName = 'RichTextEditor';

  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.instanceOf(EditorState)
  };

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  
  render() {
    const {className} = this.props;
    const {editorState} = this.state;
    
    return (
      <div className={classNames(className, styles.main)}>
        <header className={styles.header}>
          {this._renderStyleOptions()}
        </header>
        <Editor
          editorState={editorState}
          handleKeyCommand={this._handleKeyCommand}
          onChange={this._handleChange} />
      </div>
    );
  }

  _renderStyleOptions = () => {
    const currentInlineStyle = this.state.editorState.getCurrentInlineStyle();

    return inlineStyles.map((name, value) => (
      <RichTextEditorStyleButton
        active={currentInlineStyle.contains(value)}
        className={styles[`control${value}`]}
        inlineStyleName={name}
        inlineStyle={value}
        key={value}
        onClick={this._handleInlineStyleChange} />
    )).toArray();
  };
  
  _handleInlineStyleChange = (style) => {
    this._handleChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  };

  _handleChange = (editorState) => {
    this.setState({editorState});
  };

  _handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    
    if (newState) {
      this._handleChange(newState);
      return true;
    }
    
    return false;
  };

}
