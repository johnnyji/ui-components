import React, {Component, PropTypes} from 'react';
import {convertToRaw, Editor, EditorState, RichUtils} from 'draft-js';
import classNames from 'classnames';
import inlineStyles from './utils/inlineStyles';
import onstop from 'onstop';
import pureRender from 'pure-render-decorator';
import RichTextEditorStyleButton from './RichTextEditorStyleButton';
import styles from './RichTextEditor.scss';

const customStyleMap = {
  'HIGHLIGHT': {
    backgroundColor: '#F1C40F'
  }
};

@pureRender
export default class RichTextEditor extends Component {

  static displayName = 'RichTextEditor';

  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.instanceOf(EditorState),
    onStopTyping: PropTypes.func,
    onStopTypingTimeout: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  static defaultProps = {
    onStopTypingTimeout: 300,
    placeholder: 'Start typing here...'
  };

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this._onStopTyping = onstop(props.onStopTypingTimeout, this._handleStopTyping);
  }

  componentDidMount () {
    if (this.props.onStopTyping) {
      this.Editor.refs.editorContainer.addEventListener('keyup', this._onStopTyping);
    }
  }

  componentWillUnmount () {
    debugger;
    this.Editor.refs.editorContainer.removeEventListener('keyup', this._onStopTyping);
  }

  render() {
    const {className, placeholder} = this.props;
    const {editorState} = this.state;
    const content = editorState.getCurrentContent();
    const emptyAndStyled = !content.hasText() && (content.getBlockMap().first().getType() !== 'unstyled');

    // If the user changes block type before entering any text, we need
    // to hide the placeholder
    const editorClassNames = classNames(
      styles.editor,
      emptyAndStyled ? styles.hidePlaceholder : null
    );
    
    return (
      <div className={classNames(className, styles.main)}>
        <header className={styles.header}>
          {this._renderStyleOptions()}
        </header>
        <div className={editorClassNames}>
          <Editor
            editorState={editorState}
            customStyleMap={customStyleMap}
            handleKeyCommand={this._handleKeyCommand}
            onChange={this._handleChange}
            placeholder={placeholder}
            ref={this._setEditorRef}
            spellCheck={true} />
        </div>
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

  _handleStopTyping = () => {
    this.props.onStopTyping(convertToRaw(this.state.editorState.getCurrentContent()));
  };

  _setEditorRef = (node) => {
    this.Editor = node;
  };

}