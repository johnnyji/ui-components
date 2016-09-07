/* eslint-disable react/no-did-update-set-state */
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {findDOMNode} from 'react-dom';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {PLACEMENTS} from './config';
import pureRender from 'pure-render-decorator';
import styles from './TooltipAnchor.scss';

@pureRender
export default class TooltipAnchor extends Component {

  static displayName = 'TooltipAnchor';

  static propTypes = {
    className: PropTypes.string,
    edgeDetectionPadding: PropTypes.number.isRequired,
    placement: PropTypes.oneOf(PLACEMENTS).isRequired,
    tooltip: PropTypes.element.isRequired,
    tooltipSpacing: PropTypes.number.isRequired,
    triggers: ImmutablePropTypes.listOf(
      PropTypes.oneOf(['hover', 'click'])
    ).isRequired
  };

  static defaultProps = {
    edgeDetectionPadding: 5,
    placement: 'top',
    tooltipSpacing: 6,
    triggers: Immutable.List(['hover'])
  };

  constructor(props) {
    super(props);
    this.state = {
      placement: props.placement,
      shown: false,
      tooltipPosition: {}
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._debounceResize);
    window.addEventListener('scroll', this._debounceScroll);
  }

  componentWillReceiveProps({placement}) {
    // If the placement changes, we need to update the state
    if (placement !== this.props.placement) {
      this.setState({placement});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // We need to recalculate the position of the tooltip if:
    //
    // 1. The tooltip was just mounted
    // 2. The anchor element that triggers the tooltip has changed
    // 3. The placement has been newly updated and edge detected
    if (
      !prevState.shown && this.state.shown ||
      prevProps.children !== this.props.children ||
      ((prevState.placement !== this.state.placement) && this.state.shown)
    ) {
      // We need to calculate a mock position of the tooltip. This mock position is then
      // used to polyfill the real tooltip positions in `_calculatePlacement`. The reason we use
      // a mock position instead of the real one is because the real one will just shrink the tooltip to
      // try and fit inside the browser, a mock position will truely tell us whether or not the tooltip
      // will go over the browser with the newly updated placement
      const mockPosBasedOnOriginalPlacement = this._calculateTooltipPos(this.state.placement);

      // We calculate the most optimal placement here using a polyfill of where the tooltip is suppose to be rendered
      const placement = this._calculatePlacement(this.state.placement, mockPosBasedOnOriginalPlacement);

      // Calculate the real position using the edge-detection optimized placement
      const tooltipPosition = this._calculateTooltipPos(placement);

      this.setState({placement, tooltipPosition});
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._debounceResize);
    window.removeEventListener('scroll', this._debounceScroll);
  }

  render() {
    const {shown, tooltipPosition} = this.state;
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
          style: {...tooltip.props.style, position: 'fixed', ...tooltipPosition}
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
  _calculateTooltipPos = (placement) => {
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

    const estimatedPosition = {
      ...(tooltipLeft ? {left: tooltipLeft} : {}),
      ...(tooltipBottom ? {bottom: tooltipBottom} : {}),
      ...(tooltipTop ? {top: tooltipTop} : {}),
      ...(tooltipRight ? {right: tooltipRight} : {})
    };

    // If there's a tooltip rendered, we can generate the most accurate
    // position instead of just estimating, if not we just return the estimated
    // position
    const tooltip = findDOMNode(this.refs.tooltip);
    if (!tooltip) return estimatedPosition;

    const {
      height: tHeight,
      width: tWidth
    } = tooltip.getBoundingClientRect();

    // The tooltip element will have a different `left` and `top` position
    // than the one we already estimated if it's currently mounted. Therefore
    // we need to use the positions from our `estimatedPosition` instead of
    // the ones we extract from the tooltip node
    const tLeft = estimatedPosition.left || estimatedPosition.right - tWidth;
    const tTop = estimatedPosition.top || estimatedPosition.bottom - tHeight;

    const accuratePosition = {};

    switch (placement) {
      case 'top':
      case 'bottom': {
        // Shifts the tooltips weight origin X to the center, thus centering it horizontally
        accuratePosition.left = tLeft - (tWidth / 2);
        break;
      }
      case 'left':
      case 'right': {
        // Shifts the tooltips weight origin Y to the center, thus centering it vertically
        accuratePosition.top = tTop - (tHeight / 2);
        break;
      }
      default: {
        break;
      }
    }

    // Returns the fully accurate styles
    return Object.assign({}, estimatedPosition, accuratePosition);
  };

  _debounceResize = () => {
    clearTimeout(this._onResize);
    this._onResize = setTimeout(this._handlePlacementUpdate, 10);
  };

  _debounceScroll = () => {
    clearTimeout(this._onScroll);
    this._onScroll = setTimeout(this._handlePlacementUpdate, 10);
  }

  _handlePlacementUpdate = () => {
    // We need to calculate a mock position of the tooltip using the placement
    // the user originally intended (the placement prop). This mock position is then
    // used to polyfill the real tooltip positions in `_calculatePlacement`. The reason
    // we mock a position is because when we resize/scroll, the tooltip will actually try to shrink
    // itself in order to adapt to the browser and try to fit inside.
    //
    // Instead, a mock position (because its not rendered and therefore non-changeable), will
    // explicitly tell us whether or not the tooltip is going over the edge of the browser
    const mockPosBasedOnOriginalPlacement = this._calculateTooltipPos(this.props.placement);

    // We calculate the most optimal placement here using the user's original intended
    // position (prop) and a polyfill of where the tooltip is suppose to be rendered. This way,
    // if the tooltip was suppose to overflow the browser's edge. We can change the placement programatically
    const placement = this._calculatePlacement(this.props.placement, mockPosBasedOnOriginalPlacement);

    // Calculate the real position using the edge-detection optimized placement
    const tooltipPosition = this._calculateTooltipPos(placement);

    this.setState({placement, tooltipPosition});
  };

  _hideTooltip = () => {
    this.setState({
      shown: false,
      tooltipPosition: {}
    });
  };

  _showTooltip = () => {
    this.setState({shown: true});
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
   * @param {Object} defaultPositions - The default tooltip positions to use if provided
   * @return {String} - The valid placement
   */
  _calculatePlacement = (defaultPlacement, defaultPos = {}) => {
    const {tooltip} = this.refs;

    // If theres no tooltip, we can't edge detect, therefore just return the user's provided
    // placement
    if (!this.refs.tooltip) return defaultPlacement;

    const {
      bottom: dBottom,
      left: dLeft,
      right: dRight,
      top: dTop
    } = defaultPos;
    const {edgeDetectionPadding, tooltipSpacing} = this.props;

    // Because the tooltip is position FIXED, we need to account for the coordinates in respect
    // to the page
    const tooltipPos = findDOMNode(tooltip).getBoundingClientRect();

    const bottom = (dTop ? (dTop + tooltipPos.height) : tooltipPos.bottom) + tooltipSpacing;
    const left = (dRight ? (window.innerWidth - dRight - tooltipPos.width) : tooltipPos.left) - tooltipSpacing;
    const right = (dLeft ? (dLeft + tooltipPos.width) : tooltipPos.right) + tooltipSpacing;
    const top = (dBottom ? (window.innerHeight - dBottom - tooltipPos.height) : tooltipPos.top) - tooltipSpacing;

    const bottomTouching = bottom >= (window.innerHeight - edgeDetectionPadding);
    const leftTouching = left <= edgeDetectionPadding;
    const rightTouching = right >= (window.innerWidth - edgeDetectionPadding);
    const topTouching = top <= edgeDetectionPadding;

    const invalidPlacements = [];

    if (leftTouching) invalidPlacements.push('left');
    if (topTouching) invalidPlacements.push('top');
    if (bottomTouching) invalidPlacements.push('bottom');
    if (rightTouching) invalidPlacements.push('right');

    const validPlacements = PLACEMENTS.filter((p) => !invalidPlacements.includes(p));

    // If there is no valid placements or the user's placement is valid, we just use the user's placement
    if (
      !validPlacements.length ||
      validPlacements.length === PLACEMENTS.length ||
      validPlacements.includes(defaultPlacement)
    ) {
      return defaultPlacement;
    }

    // If the users placement is invalid, we use the first valid placement
    return validPlacements[0];
  };

}
/* eslint-enable react/no-did-update-set-state */
