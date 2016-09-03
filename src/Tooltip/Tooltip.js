import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';
import styles from './Tooltip.scss';

@pureRender
export default class Tooltip extends Component {

  static displayName = 'Tooltip';

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {className, style} = this.props;

    return (
      <div className={classNames(styles.main, className)} style={style}>
        {this.props.children}
      </div>
    );
  }

}
