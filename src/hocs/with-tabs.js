import React, {PureComponent} from "react";

import Tabs from "../components/tabs/tabs.jsx";
import {TabType} from "../consts.js";

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TabType.OVERVIEW
      };

      this._handleTabClick = this._handleTabClick.bind(this);
      this._getTabs = this._getTabs.bind(this);
    }

    _handleTabClick(currentTab) {
      this.setState({
        activeTab: currentTab
      });
    }

    _getTabs() {
      const {activeTab} = this.state;

      return (
        <Tabs
          activeTab={activeTab}
          onTabClick={this._handleTabClick}
        />
      );
    }

    render() {
      const activeTab = this.state;

      return (
        <Component
          {...this.props}
          renderTabs={this._getTabs}
          activeTab={activeTab}
        />
      );
    }
  }

  return WithTabs;
};


export default withTabs;
