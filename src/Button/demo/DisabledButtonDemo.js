import React, {Component} from 'react';
import Button from '../Button';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class DisabledButtondDemo extends Component {

  static displayName = 'DisabledButtondDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Button
          disabled={true}
          onClick={() => {}}>
          Disabled Button
        </Button>
      </div>
    );
  }

}

