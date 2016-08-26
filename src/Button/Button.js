import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Button.scss';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Button extends Component {

  static displayName = 'Button';

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    disabled: false
  };
  
  render() {
    const {className, disabled} = this.props;

    const classes = classNames(
      className,
      styles.main,
      disabled ? styles.disabled : null
    );

    return (
      <button
        className={classes}
        disabled={disabled}
        onClick={this._handleClick}>
        {this.props.children}
      </button>
    );
  }

  _handleClick = () => {
    if (!this.props.disabled) {
      this.props.onClick();
    }
  }

}

