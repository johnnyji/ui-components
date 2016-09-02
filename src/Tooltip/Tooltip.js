import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import {findDOMNode} from 'react-dom';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import styles from './Tooltip.scss';

@pureRender
export default class Tooltip extends Component {

  static displayName = 'Tooltip';

  static propTypes = {
    className: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    tooltip: PropTypes.element.isRequired,
    tooltipSpacing: PropTypes.number.isRequired,
    triggers: ImmutablePropTypes.listOf(
      PropTypes.oneOf(['hover', 'click'])
    ).isRequired
  };

  static defaultProps = {
    placement: 'top',
    tooltipSpacing: 3,
    triggers: Immutable.List(['hover'])
  };

  constructor (props) {
    super(props);
    this.state = {
      placement: props.placement,
      shown: false,
      tooltipStyles: {}
    };
  }

  componentDidMount () {
    // const {triggers} = this.props;
    // const anchor = findDOMNode(this);
    window.addEventListener('resize', this._debounceResize);

    // TODO: We don't know if at any given point if the triggers
    // change. How can we ensure we're removing all event listeners
    // on unmount?
    // if (triggers.includes('hover')) {
    //   anchor.addEventListener('mouseenter', this._showTooltip);
    //   anchor.addEventListener('mouseleave', this._hideTooltip);
    // }

    // if (triggers.includes('click')) {
    //   anchor.addEventListener('click', this._toggleTooltip);
    // }
  }

  componentWillReceiveProps (nextProps) {
    // If the anchor or placement changes, we have to
    // recalculate the placement and position
    if (
      nextProps.children !== this.props.children ||
      nextProps.placement !== this.props.placement
    ) {
      const placement = this._getValidPlacement(nextProps.placement);

      this.setState({
        placement,
        tooltipStyles: this._calculateInitPosition(placement)
      });
    }
  }

  componentDidUpdate (_, prevState) {
    // When the tooltip is shown, we have access to it's height
    // and width, meaning we need to immediately recalculate it's
    // position to a more accurate one than what we original estimated
    // with `_calculateInitPosition`
    //
    // When the user changes the placement prop while the tooltip is shown,
    // we need to adjust the new position given the new placement
    if (
      !prevState.shown && this.state.shown ||
      ((prevState.placement !== this.state.placement) && this.state.shown)
    ) {
      const placement = this._getValidPlacement(this.state.placement);

      this.setState({
        placement,
        tooltipStyles: this._adjustTooltipPosition(placement)
      });
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._debounceResize);
  }

  render () {
    const {shown, tooltipStyles} = this.state;
    const {children, className, tooltip, triggers} = this.props;

    const tooltipTriggers = {
      ...(triggers.includes('hover') ? {onMouseEnter: this._showTooltip, onMouseLeave: this._hideTooltip} : {}),
      ...(triggers.includes('click') ? {onClick: this._toggleTooltip} : {})
    };

    return (
      <div className={classNames(styles.main, className)} {...tooltipTriggers}>
        {children}
        {shown && React.cloneElement(tooltip, {
          ref: 'tooltip',
          style: {background: 'green', position: 'fixed', ...tooltipStyles}
        })}
      </div>
    );
  }

  /**
   * Estimates the position of the tooltip before it renders. This is succeeded by `_adjustTooltipPositon`
   * which will calculate the more accurate position immediately post render of the tooltip
   * @param {String} placement - The directional placement of the tooltip
   * @return {Object} - The tooltip position/style
   */
  _calculateInitPosition = (placement = this.state.placement) => {
    const {tooltipSpacing} = this.props;

    const anchor = findDOMNode(this);
    const {bottom, height, left, right, top, width} = anchor.getBoundingClientRect();

    // Horizontal and vertical centers of the anchor element
    const centerX = left + (width / 2);
    const centerY = top + (height / 2);

    let tooltipBottom;
    let tooltipLeft;
    let tooltipRight;
    let tooltipTop;

    switch (placement) {
      case 'top': {
        // Shift the tooltip horizontally centered and above the anchor
        tooltipLeft = centerX;
        tooltipBottom = window.innerHeight - (top - tooltipSpacing);
        break;
      }
      case 'left': {
        // Shift the tooltip vertically centered and to the left of the anchor
        tooltipRight = window.innerWidth - (left - tooltipSpacing);
        tooltipTop = centerY;
        break;
      }
      case 'bottom': {
        // Shift the tooltip horizontally centered and below the anchor
        tooltipLeft = centerX;
        tooltipTop = bottom + tooltipSpacing;
        break;
      }
      case 'right': {
        // Shift the tooltip vertically centered and to the right of the anchor
        tooltipLeft = right + tooltipSpacing;
        tooltipTop = centerY;
        break;
      }
      default: {
        break;
      }
    }

    return {
      ...(tooltipLeft ? {left: tooltipLeft} : {}),
      ...(tooltipBottom ? {bottom: tooltipBottom} : {}),
      ...(tooltipTop ? {top: tooltipTop} : {}),
      ...(tooltipRight ? {right: tooltipRight} : {})
    };
  };

  /**
   * After the tooltip is rendered, we want to adjust it's estimated position to a fully
   * calculated position, which is now possible because we have it's height and width post rendering
   * @return {Object} - The new position/styles
   */
  _adjustTooltipPosition = (placement = this.state.placement) => {
    const {height, left, top, width} = findDOMNode(this.refs.tooltip).getBoundingClientRect();
    const styles = {};

    switch (placement) {
      case 'top':
      case 'bottom': {
        // Shifts the tooltips weight origin X to the center, thus centering it horizontally
        styles.left = left - (width / 2);
        break;
      }
      case 'left':
      case 'right': {
        // Shifts the tooltips weight origin Y to the center, thus centering it vertically
        styles.top = top - (height / 2);
        break;
      }
      default: {
        break;
      }
    }

    return Object.assign({}, this.state.tooltipStyles, styles);
  };

  /**
   * Debounces the edge detection because window resize fires like crazy
   * @returns {Function} - The debounced function
   */
  _debounceResize = () => debounce(this._handlePlacementUpdate, 10);

  _handlePlacementUpdate = () => {
    this.setState({placement: this._getValidPlacement(this.state.placement)});
  };

  _hideTooltip = () => {
    this.setState({
      shown: false,
      tooltipStyles: {}
    });
  };

  _showTooltip = () => {
    this.setState({
      shown: true,
      tooltipStyles: this._calculateInitPosition()
    });
  };

  _toggleTooltip = () => {
    if (this.state.shown) {
      this._hideTooltip();
      return;
    }

    this._showTooltip();
  };

  /**
   * Generates a valid placement by detecting potential browser edges
   * @param {String} defaultPlacement - The placement to default to if no valid one is detected
   * @return {String} - The valid placement
   */
  _getValidPlacement = (defaultPlacement) => {
    const {tooltip} = this.refs;

    // If theres no tooltip, we can't edge detect, therefore just return the user's provided
    // placement
    if (!this.refs.tooltip) return defaultPlacement;

    const {bottom, left, right, top, width} = findDOMNode(tooltip).getBoundingClientRect();
    const bottomTouching = bottom >= window.innerHeight;
    const leftTouching = left <= 0 || left < width;
    const rightTouching = right >= window.innerWidth || ((window.innerWidth - right) < width);
    const topTouching = top <= 0;
    const invalidPlacements = [];

    if (leftTouching) invalidPlacements.push('left');
    if (topTouching) invalidPlacements.push('top');
    if (bottomTouching) invalidPlacements.push('bottom');
    if (rightTouching) invalidPlacements.push('right');

    const validPlacements = ['top', 'left', 'bottom', 'right'].filter((p) => !invalidPlacements.includes(p));

    // If there is no valid placements or the user's placement is valid, we just use the user's placement
    if (!validPlacements.length || (validPlacements.length && validPlacements.includes(defaultPlacement))) {
      return defaultPlacement;
    }

    // If the users placement is invalid, we use the first valid placement
    return validPlacements[0];
  };

}
