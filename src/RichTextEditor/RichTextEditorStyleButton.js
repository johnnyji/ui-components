import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import inlineStyles from './utils/inlineStyles';
import pureRender from 'pure-render-decorator';
import styles from './RichTextEditorStyleButton.scss';

const inlineStylesArr = inlineStyles.keySeq().toArray();
const inlineStyleNamesArr = inlineStyles.valueSeq().toArray();

@pureRender
export default class RichTextEditorStyleButton extends Component {

  static displayName = 'RichTextEditorStyleButton';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    activeClassName: PropTypes.string.isRequired,
    className: PropTypes.string,
    inlineStyle: PropTypes.oneOf(inlineStylesArr).isRequired,
    inlineStyleName: PropTypes.oneOf(inlineStyleNamesArr).isRequired,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    activeClassName: styles.active
  };
  
  render() {
    const {active, activeClassName, className, inlineStyleName} = this.props;
    const classes = classNames(
      styles.main,
      className,
      active ? activeClassName : null
    );

    return (
      <button className={classes} onClick={this._handleClick}>
        {inlineStyleName}
      </button>
    );
  }

  _handleClick = () => {
    this.props.onClick(this.props.inlineStyle);
  };

}
