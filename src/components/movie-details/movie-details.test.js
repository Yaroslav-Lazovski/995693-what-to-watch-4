import React from "react";
import renderer from "react-test-renderer";

import MovieDetails from "./movie-details.jsx";


const movie = {
  genre: `Drama`,
  year: 2014,
  director: `Movie director`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  runTime: 120
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
