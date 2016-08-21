import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class DemoContent extends Component {

  static displayName = 'DemoContent';

  static propTypes = {
    component: PropTypes.func.isRequired
  };

  render() {
    const {component: DemoComponent} = this.props;

    return (
      <div className={styles.content}>
        <DemoComponent />
      </div>
    );
  }

}
