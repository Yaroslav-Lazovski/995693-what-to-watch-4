import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import history from "../../history";
import {MoviesList} from "./movies-list.jsx";

import NameSpace from "../../reducer/name-space";
import movies from "../../mocks/films.js";
import {GENRES} from "../../consts.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies
  },
  [NameSpace.STATE]: {
    genre: GENRES.ALL,
  }
});


describe(`MoviesList Snapshot`, () => {
  it(`Should movies list render correctly`, () => {

    const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Provider store={store}>
            <MoviesList
              movies={movies}
              genre={GENRES.ALL}
              showedMoviesNumber={8}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            />
          </Provider>
        </Router>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
