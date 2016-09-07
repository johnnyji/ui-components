import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './Tooltip.scss';

export default class Tooltip extends PureComponent {

  static displayName = 'Tooltip';

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({})
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
