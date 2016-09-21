import React, {Component} from 'react';
import Clickable from '../Clickable';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class DisabledClickabledDemo extends Component {

  static displayName = 'DisabledClickabledDemo';

  render() {
    return (
      <div className={styles.main}>
        <Clickable
          disabled={true}
          onClick={() => {}}>
          Disabled Clickable
        </Clickable>
      </div>
    );
  }

}

