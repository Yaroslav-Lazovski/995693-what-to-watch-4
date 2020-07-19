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
        director= {movie.director}
        starring= {movie.starring}
        runTime= {movie.runTime}
        genre= {movie.genre}
        year= {movie.year}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
