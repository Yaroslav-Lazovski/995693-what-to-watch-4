import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import history from "../../history";
import {SignIn} from "./sign-in.jsx";

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <SignIn
          onSubmit={() => {}}
          isErrorAuth={true}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
