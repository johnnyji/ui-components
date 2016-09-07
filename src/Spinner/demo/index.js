import React, {PureComponent} from 'react';
import DemoView from '../../demo/index';
import RegularSpinnerDemo from './RegularSpinnerDemo';

export default class SpinnerDemo extends PureComponent {

  static displayName = 'SpinnerDemo';

  render () {
    const demos = [
      {title: 'Spinner', component: RegularSpinnerDemo}
    ];

    return (
      <DemoView demoViews={demos} />
    );
  }

}
