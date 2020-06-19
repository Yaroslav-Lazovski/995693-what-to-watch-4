import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

// import {movieInfo} from "../../mocks/movie-info.js";
import films from "../../mocks/films.js";


describe(`MoviesList Snapshot`, () => {
  it(`Should movies list render correctly`, () => {
    const tree = renderer
      .create(<MoviesList
        movies={films}
        onTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});