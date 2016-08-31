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
      .toKeySeq()
      .keys()
      .map((name, i) => (
        <div key={i}>
          <Icon name={name} />
          {name}
        </div>
      ));
  };

}

