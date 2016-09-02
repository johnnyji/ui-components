import React, {Component} from 'react';
import Button from '../Button';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class ActiveButtonDemo extends Component {

  static displayName = 'ActiveButtonDemo';
  
  render() {
    return (
      <div className={styles.main}>
        <Button
          active={true}
          onClick={() => {}}>
          Active Button
        </Button>
      </div>
    );
  }

}

