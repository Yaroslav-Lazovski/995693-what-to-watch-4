import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {Header} from "./header.jsx";
import history from "../../history";

import {AuthorizationStatus} from "../../consts";

it(`Header component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Header
          authorizationStatus={AuthorizationStatus.NO_AUTH}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
