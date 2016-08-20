import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import config from './config';
import pureRender from 'pure-render-decorator';
import styles from './RichTextEditorStyleButton.scss';

const blockStyleStyles = config.blockStyles.map(({style}) => style);
const blockStyleLabels = config.blockStyles.map(({label}) => label);
const inlineStyleStyles = config.inlineStyles.map(({style}) => style);
const inlineStyleLabels = config.inlineStyles.map(({label}) => label);

@pureRender
export default class RichTextEditorStyleButton extends Component {

  static displayName = 'RichTextEditorStyleButton';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    activeClassName: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.oneOf([...blockStyleLabels, ...inlineStyleLabels]).isRequired,
    onToggle: PropTypes.func.isRequired,
    style: PropTypes.oneOf([...blockStyleStyles, ...inlineStyleStyles]).isRequired
  };

  static defaultProps = {
    activeClassName: styles.active
  };
  
  render() {
    const {active, activeClassName, className, label} = this.props;
    const classes = classNames(
      styles.main,
      className,
      active ? activeClassName : null
    );

    return (
      <button className={classes} onMouseDown={this._handleClick}>
        {label}
      </button>
    );
  }

  _handleClick = (e) => {
    // We need to prevent the default behaviour of the mousedown in
    // order to remain focus on the editor, otherwise clicking the button
    // doesn't apply inline styles
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

}