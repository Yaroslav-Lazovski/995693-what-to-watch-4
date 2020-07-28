import React from "react";
import renderer from "react-test-renderer";

import {Header} from "./header.jsx";

import {AuthorizationStatus} from "../../consts";

it(`Header component render correctly`, () => {
  const tree = renderer.create(
      <Header
        authorizationStatus={AuthorizationStatus.NO_AUTH}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
