import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import icons from './icons';

const ICON_NAMES = icons.keySeq().toArray();

@pureRender
export default class Icon extends Component {

  static displayName = 'Icon';

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.oneOf(ICON_NAMES).isRequired,
    size: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    size: 24
  };

  render() {
    const icon = icons.get(this.props.name);

    if (!icon) return null;

    const styles = Object.assign({}, this.props.style, {
      fill: 'currentcolor',
      verticalAlign: 'middle',
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size // Prevents scaling issue in IE
    });

    return (
      <svg
        className={this.props.className}
        preserveAspectRatio='xMidYMid meet'
        style={styles}
        viewBox='0 0 24 24'>
        {icon}
      </svg>
    );
  }

}
