import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class DemoContent extends Component {

  static displayName = 'DemoContent';

  static propTypes = {
    content: PropTypes.element.isRequired
  };

  render() {
    const {content: DemoComponent} = this.props;

    return (
      <div className={styles.content}>
        <DemoComponent />
      </div>
    );
  }

}
