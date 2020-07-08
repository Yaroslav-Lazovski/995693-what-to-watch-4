import movies from "./mocks/films.js";
import {extend} from "./utils.js";
import {GENRES, MAX_MOVIES_IN_LIST} from "./consts.js";


const initialState = {
  genre: GENRES.ALL,
  movies,
  showedMoviesNumber: MAX_MOVIES_IN_LIST,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWED_MOVIES: `RESET_SHOWED_MOVIES`
};

const ActionCreator = {
  changeGenre: (genre)=>({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),

  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: MAX_MOVIES_IN_LIST
  }),

  resetShowedMovies: () => ({
    type: ActionType.RESET_SHOWED_MOVIES,
    payload: MAX_MOVIES_IN_LIST
  })
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });

    case ActionType.SHOW_MORE_MOVIES:
      return extend(state, {
        showedMoviesNumber: state.showedMoviesNumber + action.payload
      });

    case ActionType.RESET_SHOWED_MOVIES:
      return extend(state, {
        showedMoviesNumber: action.payload
      });

    default: return state;
  }
};

export {reducer, ActionType, ActionCreator};
