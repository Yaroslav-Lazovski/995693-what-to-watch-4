import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

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
  runTime: 120
};

const reviews = [
  {
    id: 1,
    author: `Kate Muir`,
    date: `December 24, 2016`,
    rating: 8.9,
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years`,
  },
  {
    id: 2,
    author: `Bill Goodykoontz`,
    date: `November 18, 2015`,
    rating: 8.0,
    text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
  },
];

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
        <Provider store={store}>
          <MoviePage
            movie={movie}
            movies={movies}
            reviews={reviews}
            activeTab={activeTab}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            renderTabs={() => {}}
            onTitleClick={() => {}}
            onPosterClick={() => {}}
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
