import React, {PropTypes, PureComponent} from 'react';
import config from './config';
import {EditorState} from 'draft-js';
import RichTextEditorStyleButton from './RichTextEditorStyleButton';
import styles from './RichTextEditorHeader.scss';

export default class RichTextEditorHeader extends PureComponent {

  static displayName = 'RichTextEditorHeader';

  static propTypes = {
    activeColor: PropTypes.string,
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onToggleBlockType: PropTypes.func.isRequired,
    onToggleInlineStyle: PropTypes.func.isRequired
  };

  render() {
    return (
      <header className={styles.main}>
        {this._renderInlineStyles()}
        {this._renderBlockStyles()}
      </header>
    );
  }

  _renderBlockStyles = () => {
    const {activeColor, editorState, onToggleBlockType} = this.props;
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();

    return config.blockStyles.map(({label, style}) => (
      <RichTextEditorStyleButton
        active={blockType === style}
        activeColor={activeColor}
        className={styles[`control${style}`]}
        label={label}
        onToggle={onToggleBlockType}
        style={style}
        key={style} />
    ));
  };

  _renderInlineStyles = () => {
    const {activeColor, editorState, onToggleInlineStyle} = this.props;
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    return config.inlineStyles.map(({label, style}) => (
      <RichTextEditorStyleButton
        active={currentInlineStyle.has(style)}
        activeColor={activeColor}
        className={styles[`control${style}`]}
        label={label}
        onToggle={onToggleInlineStyle}
        style={style}
        key={style} />
    ));
  };

}
