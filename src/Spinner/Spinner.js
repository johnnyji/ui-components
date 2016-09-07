import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames';
import Spinkit from 'react-spinkit';
import styles from './Spinner.scss';

export default class Spinner extends PureComponent {

  static displayName = 'Spinner';

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <Spinkit
        className={classNames(this.props.className, styles.main)}
        spinnerName='wave' />
    );
  }

}
