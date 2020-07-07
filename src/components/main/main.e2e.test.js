import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import Main from "./main.jsx";

import movies from "../../mocks/films.js";
import {GENRES} from "../../consts.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

const mockStore = configureStore([]);
const store = mockStore({
  genre: GENRES.ALL,
  movies,
});

describe(`Main e2e tests`, () => {
  it(`Should film title be clicked`, () => {
    const onTitleClick = jest.fn();

    const mainComponent = mount(
        <Provider store={store}>
          <Main
            promoTitle={`The Grand Budapest Hotel`}
            promoGenre={`Drama`}
            promoYear={2014}
            movies={movies}
            onTitleClick={onTitleClick}
            onPosterClick={() => {}}
          />
        </Provider>
    );

    const movieTitle = mainComponent.find(`.small-movie-card__link`).first();

    movieTitle.simulate(`click`, mockEvent);

    expect(onTitleClick.mock.calls.length).toBe(1);
  });


  it(`Should film poster be clicked`, () => {
    const onPosterClick = jest.fn();

    const mainComponent = mount(
        <Provider store={store}>
          <Main
            promoTitle={`The Grand Budapest Hotel`}
            promoGenre={`Drama`}
            promoYear={2014}
            movies={movies}
            onTitleClick={() => {}}
            onPosterClick={onPosterClick}
          />
        </Provider>
    );

    const moviePoster = mainComponent.find(`.small-movie-card`).first();

    moviePoster.simulate(`click`, mockEvent);

    expect(onPosterClick.mock.calls.length).toBe(1);
  });
});
