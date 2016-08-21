import React, {Component, PropTypes} from 'react';
import components from './components';
import pureRender from 'pure-render-decorator';
import styles from './ComponentsListing.scss';

@pureRender
export default class ComponentsListing extends Component {

  static displayName = 'ComponentsListing';

  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };
  
  render() {
    return (
      <div className={styles.main}>
        <h1 className={styles.title}>UI Components</h1>
        <div className={styles.list}>
          {this._renderComponentsList()}
        </div>
      </div>
    );
  }

  _renderComponentsList = () => {
    return components.map((component, i) => (
      <button
        className={styles.item}
        key={i}
        onClick={() => this._handleClick(component)}>
        {component}
      </button>
    ));
  };

  _handleClick = (component) => {
    this.context.router.push(`/components/${component}`);
  };

}

