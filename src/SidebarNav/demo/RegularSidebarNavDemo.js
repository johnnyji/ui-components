import Clickable from '../../Clickable/Clickable';
import Icon from '../../Icon/Icon';
import React, {PureComponent} from 'react';
import SidebarNav from '../SidebarNav';
import SidebarNavItem from '../SidebarNavItem';
import styles from './index.scss';

export default class RegularSidebarNavDemo extends PureComponent {

  static displayName = 'RegularSidebarNavDemo';

  state = {
    isOpen: false
  };

  render() {
    return (
      <div className={styles.main}>
        <header>
          <Clickable onClick={this._toggleOpen}>
            <Icon name={this.state.isOpen ? 'close' : 'menu'} />
          </Clickable>
        </header>
        <SidebarNav isOpen={this.state.isOpen}>
          <SidebarNavItem
            icon='folder'
            label='Collections'
            name='These are collections!'
            onClick={alert} />
          <SidebarNavItem
            icon='documents'
            label='Documents'
            name='These are documents!'
            onClick={alert} />
          <SidebarNavItem
            icon='write'
            label='Templates'
            name='These are templates!'
            onClick={alert} />
        </SidebarNav>
      </div>
    );
  }

  _toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

}
