import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import {Main} from "./main.jsx";

import NameSpace from "../../reducer/name-space";
import movies from "../../mocks/films.js";
import movie from "../../mocks/movie.js";
import {GENRES, AuthorizationStatus} from "../../consts.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

const mockStore = configureStore([]);
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

beforeEach(() => {
  store.clearActions();
});

describe(`Main e2e tests`, () => {
  it(`Should film title be clicked`, () => {
    const onTitleClick = jest.fn();

    const mainComponent = mount(
        <Provider store={store}>
          <Main
            movie={movie}
            movies={movies}
            showedMoviesNumber={8}
            onTitleClick={onTitleClick}
            onPosterClick={() => {}}
            onShowMoreButtonClick={() => {}}
            onFullScreenToggle={() => {}}
            setFullScreenPlayer={() => {}}
            isPlayerActive={false}
          />
        </Provider>
    );

    const movieTitle = mainComponent.find(`.small-movie-card__link`).first();

    movieTitle.simulate(`click`, mockEvent);

    expect(onTitleClick.mock.calls.length).toBe(1);
  });


  it(`Should film poster be clicked`, () => {
    const expectedActions = [{type: `GET_ACTIVE_MOVIE_ID`, payload: 1}];

    const mainComponent = mount(
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
          />
        </Provider>
    );

    const moviePoster = mainComponent.find(`.small-movie-card`).first();

    moviePoster.simulate(`click`);

    const actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });
});
