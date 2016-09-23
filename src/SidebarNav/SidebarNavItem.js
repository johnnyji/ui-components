import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import Clickable from '../Clickable/Clickable';
import Icon from '../Icon/Icon';
import styles from './SidebarNavItem.scss';

export default class SidebarNavItem extends PureComponent {

  static displayName = 'SidebarNavItem';

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const {className, icon, label} = this.props;

    return (
      <Clickable
        className={classNames(styles.main, className)}
        onClick={this._handleClick}>
        <Icon className={styles.icon} name={icon} />
        <span className={styles.text}>{label}</span>
      </Clickable>
    );
  }

  _handleClick = () => {
    this.props.onClick(this.props.name);
  };

}
