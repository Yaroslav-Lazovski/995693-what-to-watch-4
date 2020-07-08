import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import Main from "./main.jsx";

import {GENRES} from "../../consts.js";
import movies from "../../mocks/films.js";

const mockStore = configureStore([]);

describe(`Main Snapshot`, () => {
  it(`Should main render correctly`, () => {
    const store = mockStore({
      genre: GENRES.ALL,
      movies,
      showedMoviesNumber: 8
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              promoTitle={`The Grand Budapest Hotel`}
              promoGenre={`Drama`}
              promoYear={2014}
              movies={movies}
              onTitleClick={() => {}}
              onPosterClick={() => {}}
            />)
          </Provider>, {
            createNodeMock: ()=>{
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
