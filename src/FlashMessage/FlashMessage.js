import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import Clickable from '../Clickable/Clickable';
import Icon from '../Icon/Icon';
import styles from './FlashMessage.scss';

export default class FlashMessage extends PureComponent {

  static displayName = 'FlashMessage';

  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
    id: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['default', 'error', 'warning', 'success']).isRequired
  };

  static defaultProps = {
    type: 'default'
  };

  render() {
    const {className, message, type} = this.props;
    const classes = classNames(styles.main, className);
    const messageClasses = classNames(styles.message, styles[type]);
    const closeButtonClasses = classNames(styles.closeButton, styles[`closeButton-${type}`]);

    return (
      <div className={classes}>
        <span className={messageClasses}>{message}</span>
        <Clickable className={closeButtonClasses} onClick={this._handleDismiss}>
          <Icon name='close' size={20} />
        </Clickable>
      </div>
    );
  }

  _handleDismiss = () => {
    this.props.onDismiss(this.props.id);
  };

}
