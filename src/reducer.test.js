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


describe(`Action creators work correctly`, ()=>{
  it(`Action creators change genre`, ()=>{
    expect(ActionCreator.changeGenre(GENRES.COMEDIAN)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: GENRES.COMEDIAN,
    });
  });
});
