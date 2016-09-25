import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Clickable.scss';

export default class Clickable extends Component {

  static displayName = 'Clickable';

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    name: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    disabled: false
  };
  
  render() {
    const {children, className, disabled, onClick} = this.props;
    const classes = classNames(
      styles.main,
      className,
      disabled ? styles.disabled : null
    );

    return (
      <button
        className={classes}
        onClick={this._handleClick}>
        {children}
      </button>
    );
  }

  _handleClick = () => {
    this.props.onClick(this.props.name);
  };

}

