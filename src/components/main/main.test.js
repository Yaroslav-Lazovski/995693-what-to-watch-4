import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

import {MOVIE_TITLES} from "../../consts.js";


describe(`Main Component`, () => {
  it(`Should main render correctly`, () => {
    const tree = renderer
      .create(<Main
        promoTitle={`The Grand Budapest Hotel`}
        promoGenre={`Drama`}
        promoYear={2014}
        movieTitles={MOVIE_TITLES}
        onTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
