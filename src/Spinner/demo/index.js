import React, {PureComponent} from 'react';
import ColoredSpinnerDemo from './ColoredSpinnerDemo';
import DemoView from '../../demo/index';
import RegularSpinnerDemo from './RegularSpinnerDemo';

export default class SpinnerDemo extends PureComponent {

  static displayName = 'SpinnerDemo';

  render () {
    const demos = [
      {title: 'Spinner', component: RegularSpinnerDemo},
      {title: 'Colored Spinner', component: ColoredSpinnerDemo},
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
