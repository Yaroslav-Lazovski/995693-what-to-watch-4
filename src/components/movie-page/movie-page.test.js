import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import MoviePage from "./movie-page.jsx";

import movies from "../../mocks/films.js";
import {GENRES} from "../../consts.js";


const movie = {
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
  starring: `Movie starring`,
  runTime: `Movie runTime`
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
  genre: GENRES.ALL,
  movies
});


describe(`MoviePage Snapshot`, () => {
  it(`Should movie page render correctly`, () => {
    const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePage
            movieBackground={movie.background}
            movieTitle={movie.title}
            movieGenre={movie.genre}
            movieYear={movie.year}
            moviePoster={movie.poster}
            moviePosterBig={movie.posterBig}
            movieRatingScore={movie.ratingScore}
            movieRatingCount={movie.ratingCount}
            movieDescription={movie.description}
            movieDirector={movie.director}
            movieStarring={movie.starring}
            movieRunTime={movie.runTime}
            movies={movies}
            reviews={reviews}
            activeTab={activeTab}
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
