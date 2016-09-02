import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Button.scss';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Button extends Component {

  static displayName = 'Button';

  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    name: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    disabled: false
  };
  
  render() {
    const {active, className, disabled, name} = this.props;

    const classes = classNames(
      className,
      styles.main,
      {[styles.active]: active && !disabled},
      {[styles.disabled]: disabled}
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

