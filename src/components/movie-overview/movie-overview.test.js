import React from "react";
import renderer from "react-test-renderer";

import MovieOverview from "./movie-overview.jsx";


const movie = {
  director: `Movie director`,
  starring: `Movie starring`,
  ratingScore: 6.4,
  ratingCount: 240,
  description: `Movie description`
};


describe(`MovieOverview Snapshot`, () => {
  it(`Should MovieOverview render correctly`, () => {
    const tree = renderer
      .create(<MovieOverview
        movieDirector= {movie.director}
        movieStarring= {movie.starring}
        movieRatingScore={movie.ratingScore}
        movieRatingCount={movie.ratingCount}
        movieDescription={movie.description}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
