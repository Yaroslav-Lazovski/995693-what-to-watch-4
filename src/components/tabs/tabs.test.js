import React from "react";
import renderer from "react-test-renderer";

import Tabs from "./tabs.jsx";


const activeTab = `activeTab`;


describe(`MovieReviews Snapshot`, () => {
  it(`Should MovieReviews render correctly`, () => {
    const tree = renderer
      .create(<Tabs
        activeTab={activeTab}
        onTabClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
