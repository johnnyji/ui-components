import React, {PureComponent} from 'react';
import DemoView from '../../demo/index';
import DisabledButtonDemo from './DisabledButtonDemo';
import PillButtonDemo from './PillButtonDemo';
import RegularButtonDemo from './RegularButtonDemo';

export default class ButtonDemo extends PureComponent {

  static displayName = 'ButtonDemo';

  render () {
    const demos = [
      {title: 'Regular Button', component: RegularButtonDemo},
      {title: 'Pill Button', component: PillButtonDemo},
      {title: 'Disabled Button', component: DisabledButtonDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
