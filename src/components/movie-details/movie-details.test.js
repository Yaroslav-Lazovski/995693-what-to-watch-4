import React from "react";
import renderer from "react-test-renderer";

import MovieDetails from "./movie-details.jsx";


const movie = {
  genre: `Drama`,
  year: 2014,
  director: `Movie director`,
  starring: `Movie starring`,
  runTime: `1h 30m`
};


describe(`MovieDetails Snapshot`, () => {
  it(`Should MovieDetails render correctly`, () => {
    const tree = renderer
      .create(<MovieDetails
        movieDirector= {movie.director}
        movieStarring= {movie.starring}
        movieRunTime= {movie.runTime}
        movieGenre= {movie.genre}
        movieYear= {movie.year}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
