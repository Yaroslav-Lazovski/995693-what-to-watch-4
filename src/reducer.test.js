import {reducer, ActionCreator, ActionType} from "./reducer.js";

import {GENRES} from "./consts.js";
import movies from "./mocks/films.js";


it(`Returns initial state at application start`, ()=>{
  expect(reducer(undefined, {})).toEqual({
    genre: GENRES.ALL,
    movies,
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

it(`Filtered movies`, ()=>{
  expect(reducer({
    genre: GENRES.COMEDIAN,
    movies,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: null
  })).toEqual({
    genre: GENRES.COMEDIAN,
    movies: [{
      id: 8,
      title: `Johnny English`,
      genre: `Comedian`,
      poster: `img/johnny-english.jpg`,
      posterBig: `img/the-grand-budapest-hotel-poster.jpg`,
      background: `img/bg-the-grand-budapest-hotel.jpg`,
      year: 2017,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      ratingScore: 5.6,
      ratingCount: 278,
      runTime: `1h 39m`,
      director: `Wes Andreson`,
      starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    }],
  });
});


describe(`Action creators work correctly`, ()=>{
  it(`Action creators change genre`, ()=>{
    expect(ActionCreator.changeGenre(GENRES.COMEDIAN)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: GENRES.COMEDIAN,
    });
  });

  it(`Action creators filtered movies`, ()=>{
    expect(ActionCreator.getMoviesByGenre()).toEqual({
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: null,
    });
  });

});
