import React from "react";
import PropTypes from "prop-types";

import {TabType} from "../../consts.js";

const Tabs = (props) => {
  const {activeTab, onTabClick} = props;

  const changeActiveСlass = (tab) => activeTab === tab ? `movie-nav__item--active` : ``;

  const handleTabClick = (tab) => {
    return (evt) => {
      evt.preventDefault();
      onTabClick(tab);
    };
  };

  const getTab = (tab, i) => {
    return (
      <li
        className={`movie-nav__item ${changeActiveСlass(tab)}`}
        key={`${tab}-${i}`}
      >
        <a onClick={handleTabClick(tab)} href="#" className="movie-nav__link">{tab}</a>
      </li>
    );
  };

  const renderTabs = () => {
    const tabs = Object.values(TabType);

    return tabs.map(getTab);
  };

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {renderTabs()}
      </ul>
    </nav>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default Tabs;
