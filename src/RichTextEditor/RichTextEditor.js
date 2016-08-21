import React, {Component, PropTypes} from 'react';
import {CompositeDecorator, ContentState, Editor, EditorState, RichUtils} from 'draft-js';
import classNames from 'classnames';
import CustomPropTypes from './utils/CustomPropTypes';
import Immutable from 'immutable';
import onstop from 'onstop';
import pureRender from 'pure-render-decorator';
import RichTextEditorHeader from './RichTextEditorHeader';
import styles from './RichTextEditor.scss';
import textStyles from './textStyles.scss';

@pureRender
export default class RichTextEditor extends Component {

  static displayName = 'RichTextEditor';

  static propTypes = {
    activeColor: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.instanceOf(ContentState),
    enableRich: PropTypes.bool.isRequired,
    decorators: CustomPropTypes.decorators,
    onStopTyping: PropTypes.func,
    onStopTypingTimeout: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  static defaultProps = {
    enableRich: true,
    decorators: Immutable.List(),
    onStopTypingTimeout: 300,
    placeholder: 'Start typing here...'
  };

  constructor(props) {
    super(props);

    // Composing decorators that enhance functionality on the editor
    const decorators = !props.decorators.size ? undefined : new CompositeDecorator(props.decorators.toArray());

    this.state = {
      editorState: props.content ?
        EditorState.createWithContent(props.content, decorators) :
        EditorState.createEmpty(decorators)
    };

    this._onStopTyping = onstop(props.onStopTypingTimeout, this._handleStopTyping);
  }

  componentWillReceiveProps (nextProps) {
    const {content, decorators} = this.props;
    const {content: nextContent, decorators: nextDecorators} = nextProps;

    // If the ContentState of the editor has changed, we want to push that onto the EditorState
    if (!Immutable.is(content, nextContent)) {
      const {editorState} = this.state;
      this.setState({editorState: editorState.push(editorState, nextContent)});
      return;
    }

    // If the decorators have changed, we need to update them
    if (!Immutable.is(decorators, nextDecorators)) {
      const {editorState} = this.state;
      const newDecorator = new CompositeDecorator(nextDecorators.toArray());
      this.setState({editorState: EditorState.set(editorState, {decorator: newDecorator})});
    }

  }

  componentDidMount () {
    if (this.props.onStopTyping) {
      this.Editor.refs.editorContainer.addEventListener('keyup', this._onStopTyping);
    }
  }

  componentWillUnmount () {
    this.Editor.refs.editorContainer.removeEventListener('keyup', this._onStopTyping);
  }

  render() {
    const {activeColor, className, enableRich, placeholder} = this.props;
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
        {enableRich &&
          <RichTextEditorHeader
            activeColor={activeColor}
            editorState={editorState}
            onToggleBlockType={this._handleToggleBlockType}
            onToggleInlineStyle={this._handleToggleInlineStyle} />
        }
        <div className={editorClassNames} onClick={this._handleFocus}>
          <Editor
            blockStyleFn={this._renderBlockStyles}
            editorState={editorState}
            handleKeyCommand={this._handleKeyCommand}
            onChange={this._handleChange}
            placeholder={placeholder}
            ref={this._setEditorRef}
            spellCheck={true} />
        </div>
      </div>
    );
  }

  getContent = () => {
    return this.state.editorState.getCurrentContent();
  };

  _renderBlockStyles = (contentBlock) => {
    switch (contentBlock.getType()) {
      case 'blockquote': return textStyles.blockquote;
      default: return null;
    }
  };

  _handleFocus = () => {
    this.Editor.focus();
  };

  _handleToggleBlockType = (blockType) => {
    this._handleChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };
  
  _handleToggleInlineStyle = (style) => {
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
    this.props.onStopTyping(this.state.editorState.getCurrentContent());
  };

  _setEditorRef = (node) => {
    this.Editor = node;
  };

}