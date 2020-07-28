import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import {Main} from "./main.jsx";

import NameSpace from "../../reducer/name-space";
import {GENRES, AuthorizationStatus} from "../../consts.js";
import movies from "../../mocks/films.js";
import movie from "../../mocks/movie.js";

const mockStore = configureStore([]);

describe(`Main Snapshot`, () => {
  it(`Should main render correctly`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies,
        promoMovie: movie
      },
      [NameSpace.STATE]: {
        genre: GENRES.ALL,
        showedMoviesNumber: 8,
        isPlayerActive: false
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              movie={movie}
              movies={movies}
              showedMoviesNumber={8}
              onTitleClick={() => {}}
              onPosterClick={() => {}}
              onShowMoreButtonClick={() => {}}
              onFullScreenToggle={() => {}}
              setFullScreenPlayer={() => {}}
              isPlayerActive={false}
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
