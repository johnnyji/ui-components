import React, {PureComponent} from 'react';
import DemoView from '../../demo/index';
import RegularSidebarNavDemo from './RegularSidebarNavDemo';

export default class SidebarNavDemo extends PureComponent {

  static displayName = 'SidebarNavDemo';

  render () {
    const demos = [
      {title: 'Regular SidebarNav', component: RegularSidebarNavDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
