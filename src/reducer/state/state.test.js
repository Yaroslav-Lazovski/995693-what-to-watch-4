import {reducer, ActionCreator, ActionType} from "./state";

import {GENRES, MAX_MOVIES_IN_LIST} from "../../consts.js";
import movies from "../../mocks/films.js";


it(`Returns initial state at application start`, ()=>{
  expect(reducer(undefined, {})).toEqual({
    genre: GENRES.ALL,
    showedMoviesNumber: 8,
    isPlayerActive: false,
    activeMovie: -1,
    isFormDisabled: false
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
});
