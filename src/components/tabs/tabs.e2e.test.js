import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Tabs from "../tabs/tabs.jsx";
import {TabType} from "../../consts.js";


Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should tabs be pressed`, () => {
  const onTabClick = jest.fn();

  const event = {
    preventDefault() {}
  };

  const tabsComponent = shallow(
      <Tabs
        activeTab={TabType.OVERVIEW}
        onTabClick={onTabClick}
      />
  );

  const tabs = tabsComponent.find(`.movie-nav__link`);

  tabs.forEach((tab) => tab.simulate(`click`, event));

  expect(onTabClick).toHaveBeenCalledTimes(tabs.length);
});
