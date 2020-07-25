import React from "react";
import renderer from "react-test-renderer";

import MovieOverview from "./movie-overview.jsx";


const movie = {
  director: `Movie director`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  ratingScore: 6.4,
  ratingCount: 240,
  description: `Movie description`
};


describe(`MovieOverview Snapshot`, () => {
  it(`Should MovieOverview render correctly`, () => {
    const tree = renderer
      .create(<MovieOverview
        director= {movie.director}
        starring= {movie.starring}
        ratingScore={movie.ratingScore}
        ratingCount={movie.ratingCount}
        description={movie.description}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
