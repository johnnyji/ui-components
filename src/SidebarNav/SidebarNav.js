import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import styles from './SidebarNav.scss';

export default class SidebarNav extends PureComponent {

  static displayName = 'SidebarNav';

  static propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired
  };

  render() {
    const {className, isOpen} = this.props;
    const classes = classNames(
      styles.main,
      isOpen ? styles.isOpen : styles.isClosed,
      className
    );

    return (
      <div className={classes}>
        <div className={styles.navItems}>
          {this.props.children}
        </div>
        <div>Logo Here</div>
      </div>
    );
  }

}
