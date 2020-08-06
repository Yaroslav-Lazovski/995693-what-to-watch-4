import React from "react";
import renderer from "react-test-renderer";

import Preloader from "./preloader.jsx";

it(`Should Preloader render correctly`, () => {
  const tree = renderer
    .create(
        <Preloader />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
