import React, {Component, PropTypes} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import DemoContent from './DemoContent';
import pureRender from 'pure-render-decorator';
import styles from './index.scss';

@pureRender
export default class DemoView extends Component {

  static displayName = 'DemoView';

  static propTypes = {
    demoViews: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  };

  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    selectedIndex: 0
  };

  render () {
    return (
      <div className={styles.main}>
        <button onClick={this._goHome}>Home</button>
        <Tabs
          className={styles.main}
          onSelect={this._handleSelect}
          selectedIndex={this.state.selectedIndex}>
          <TabList>
            {this.props.demoViews.map(({title}, i) => (
              <Tab key={i}>{title}</Tab>
            ))}
          </TabList>
          {this.props.demoViews.map(({component}, i) => (
            <TabPanel className={styles.panel} key={i}>
              <DemoContent component={component} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }

  _goHome = () => {
    this.context.router.push('/');
  };

  _handleSelect = (index) => {
    this.setState({selectedIndex: index});
  };
}