import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { mapToCssModules } from './utils';

import TransitionEvents from './utils/TransitionEvents';

const propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  direction: PropTypes.oneOf(['prev', 'next']),
  onAnimateOutEnd: PropTypes.func,
  active: PropTypes.bool,
  animateIn: PropTypes.bool,
  animateOut: PropTypes.bool,
  index: PropTypes.number,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  tag: 'div',
  active: false,
  animateIn: true,
  animateOut: true,
};

class CarouselItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleAnimateOutEnd = this.handleAnimateOutEnd.bind(this);

    this.state = {
      direction: null,
    };

    this.isUnmounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({ direction: null });
    }
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props;
    const prevActive = prevProps.active;

    if (!active && prevActive) {
      TransitionEvents.addEndEventListener(
        ReactDOM.findDOMNode(this), this.handleAnimateOutEnd
      );
    }

    if (active !== prevActive) {
      setTimeout(() => this.startAnimation(), 20);
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleAnimateOutEnd() {
    if (this.isUnmounted) {
      return;
    }

    if (this.props.onAnimateOutEnd) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  }

  startAnimation() {
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left',
    });
  }

  render() {
    const {
      direction, active, animateIn, animateOut, className, cssModule,
      tag: Tag,
      ...attributes
    } = this.props;

    delete attributes.onAnimateOutEnd;
    delete attributes.index;

    const classes = {
      active: active && !animateIn || animateOut,
    };
    if (direction && active && animateIn) {
      classes["carousel-item-" + direction] = true;
    }
    if (this.state.direction && (animateIn || animateOut)) {
      classes["carousel-item-" + this.state.direction] = true;
    }

    // const classes = mapToCssModules(classNames(
    //   className,
    // ), cssModule);

    return (
      <Tag {...attributes} className={classNames(className, classes)} />
    );
  }
}

CarouselItem.propTypes = propTypes;
CarouselItem.defaultProps = defaultProps;

export default CarouselItem;
