import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import history from "../../history";
import {MoviePage} from "./movie-page.jsx";

import NameSpace from "../../reducer/name-space";
import movies from "../../mocks/films.js";
import {GENRES, AuthorizationStatus} from "../../consts.js";


const movie = {
  id: 1,
  background: `img/movie.jpg`,
  title: `The movie`,
  genre: `Drama`,
  year: 2014,
  poster: `img/movie-poster.jpg`,
  posterBig: `img/movie-poster-big.jpg`,
  ratingScore: 8.9,
  ratingCount: 240,
  description: `Movie description`,
  director: `Movie director`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  runTime: 120,
  isFavorite: false
};


const activeTab = `Overview`;

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies
  },
  [NameSpace.STATE]: {
    genre: GENRES.ALL,
    showedMoviesNumber: 8,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH
  }
});


describe(`MoviePage Snapshot`, () => {
  it(`Should movie page render correctly`, () => {
    const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Provider store={store}>
            <MoviePage
              movie={movie}
              movies={movies}
              activeTab={activeTab}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              renderTabs={() => {}}
              setActiveMovie={() => {}}
              isLoadingFavoriteMovie={false}
              loadMovies={() => {}}
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
