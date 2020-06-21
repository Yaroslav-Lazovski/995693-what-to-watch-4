import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

import {movieInfo} from "../../mocks/movie-info.js";


describe(`SmallMovieCard Snapshot`, () => {
  it(`Should small movie card render correctly`, () => {
    const tree = renderer
      .create(<SmallMovieCard
        movie={movieInfo}
        onTitleClick={() => {}}
        onPosterClick={() => {}}
        onMouseEnter={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
