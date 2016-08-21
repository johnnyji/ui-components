import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';
import styles from './InputError.scss';

@pureRender
export default class InputError extends Component {

  static displayName = 'InputError';

  static propTypes = {
    error: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'warning']).isRequired
  };

  render() {
    const {error, type} = this.props;
    const classes = classNames(
      styles.main,
      styles[type]
    );

    return (
      <div className={classes}>{error}</div>
    );
  }
}