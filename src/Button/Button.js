import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import styles from './Button.scss';

export default class Button extends PureComponent {

  static displayName = 'Button';

  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    name: PropTypes.string,
    onClick: PropTypes.func,
    isPill: PropTypes.bool.isRequired
  };

  static defaultProps = {
    disabled: false,
    isPill: false
  };
  
  render() {
    const {active, className, disabled, name, isPill} = this.props;

    const classes = classNames(
      styles.main,
      active && !disabled ? styles.active : null,
      disabled ? styles.disabled : null,
      isPill ? styles.pill : null,
      className
    );

    return (
      <button
        className={classes}
        disabled={disabled}
        name={name}
        onClick={this._handleClick}>
        {this.props.children}
      </button>
    );
  }

  _handleClick = () => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(this.props.name);
    }
  }

}

