import React, {Component} from 'react';
import Icon from '../Icon';
import icons from '../icons';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class IconListDemo extends Component {

  static displayName = 'IconListDemo';
  
  render() {
    return (
      <div className={styles.main}>
        {this._renderIcons()}
      </div>
    );
  }

  _renderIcons = () => {
    return icons
      .keySeq()
      .toArray()
      .sort()
      .map((name, i) => (
        <div className={styles.iconWrapper} key={i}>
          <Icon className={styles.icon} name={name} />
          {name}
        </div>
      ));
  };

}

