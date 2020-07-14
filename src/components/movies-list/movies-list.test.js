import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import MoviesList from "./movies-list.jsx";

import movies from "../../mocks/films.js";
import {GENRES} from "../../consts.js";

const mockStore = configureStore([]);

const store = mockStore({
  genre: GENRES.ALL,
  movies
});


describe(`MoviesList Snapshot`, () => {
  it(`Should movies list render correctly`, () => {

    const tree = renderer
    .create(
        <Provider store={store}>
          <MoviesList
            movies={movies}
            onTitleClick={() => {}}
            onPosterClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
