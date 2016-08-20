import React, {Component, PropTypes} from 'react';
import config from './config';
import {EditorState} from 'draft-js';
import pureRender from 'pure-render-decorator';
import RichTextEditorStyleButton from './RichTextEditorStyleButton';
import styles from './RichTextEditorHeader.scss';

@pureRender
export default class RichTextEditorHeader extends Component {

  static displayName = 'RichTextEditorHeader';

  static propTypes = {
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onToggleBlockType: PropTypes.func.isRequired,
    onToggleInlineStyle: PropTypes.func.isRequired
  };

  render() {
    return (
      <header className={styles.main}>
        {this._renderBlockStyles()}
        {this._renderInlineStyles()}
      </header>
    );
  }

  _renderBlockStyles = () => {
    const {editorState, onToggleBlockType} = this.props;
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();

    return config.blockStyles.map(({label, style}) => (
      <RichTextEditorStyleButton
        active={blockType === style}
        className={styles[`control${style}`]}
        label={label}
        onToggle={onToggleBlockType}
        style={style}
        key={style} />
    ));
  };

  _renderInlineStyles = () => {
    const {editorState, onToggleInlineStyle} = this.props;
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    return config.inlineStyles.map(({label, style}) => (
      <RichTextEditorStyleButton
        active={currentInlineStyle.has(style)}
        className={styles[`control${style}`]}
        label={label}
        onToggle={onToggleInlineStyle}
        style={style}
        key={style} />
    ));
  };

}