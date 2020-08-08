import {reducer, ActionCreator, ActionType} from "./state";

import {GENRES, MAX_MOVIES_IN_LIST} from "../../consts.js";
import movies from "../../mocks/films.js";

const movie = {
  id: 1,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  runTime: 99,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  posterBig: `img/the-grand-budapest-hotel-poster.jpg`,
  ratingScore: 8.9,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
                    Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  isFavorite: false
};


it(`Returns initial state at application start`, ()=>{
  expect(reducer(undefined, {})).toEqual({
    activeMovie: {},
    genre: GENRES.ALL,
    showedMoviesNumber: 8,
  });
});

it(`Change genre`, ()=>{
  expect(reducer({
    genre: GENRES.ALL,
    movies,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: GENRES.CRIME
  })).toEqual({
    genre: GENRES.CRIME,
    movies,
  });
});


it(`Show more movies`, ()=>{
  expect(reducer({
    showedMoviesNumber: MAX_MOVIES_IN_LIST,
  }, {
    type: ActionType.SHOW_MORE_MOVIES,
    payload: MAX_MOVIES_IN_LIST
  })).toEqual({
    showedMoviesNumber: 16
  });
});

it(`Reset displayed movies`, ()=>{
  expect(reducer({
    showedMoviesNumber: 16
  },
  {
    type: ActionType.RESET_SHOWED_MOVIES,
    payload: MAX_MOVIES_IN_LIST
  })).toEqual({
    showedMoviesNumber: MAX_MOVIES_IN_LIST
  });
});

it(`Reducer should get active movie`, () => {
  expect(reducer({
    activeMovie: {}
  }, {
    type: ActionType.GET_ACTIVE_MOVIE,
    payload: movie
  })).toEqual({
    activeMovie: movie
  });
});


describe(`Action creators work correctly`, ()=>{
  it(`Action creators change genre`, ()=>{
    expect(ActionCreator.changeGenre(GENRES.COMEDIAN)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: GENRES.COMEDIAN,
    });
  });

  it(`Action creators showing more movies`, ()=>{
    expect(ActionCreator.showMoreMovies()).toEqual({
      type: ActionType.SHOW_MORE_MOVIES,
      payload: MAX_MOVIES_IN_LIST
    });
  });

  it(`Action creators reset displayed movies`, ()=>{
    expect(ActionCreator.resetShowedMovies()).toEqual({
      type: ActionType.RESET_SHOWED_MOVIES,
      payload: MAX_MOVIES_IN_LIST
    });
  });

  it(`Action creator return action with active movie`, () => {
    expect(ActionCreator.getActiveMovie(movie)).toEqual({
      type: ActionType.GET_ACTIVE_MOVIE,
      payload: movie,
    });
  });
});
