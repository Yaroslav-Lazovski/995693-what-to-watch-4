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
