import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import Footer from "./footer.jsx";

import history from "../../history";

it(`Should Footer render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Footer
            onReplayButtonClick={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
