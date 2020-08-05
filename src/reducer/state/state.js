import {extend} from "../../utils.js";
import {GENRES, MAX_MOVIES_IN_LIST} from "../../consts.js";


const initialState = {
  activeMovie: {},
  genre: GENRES.ALL,
  showedMoviesNumber: MAX_MOVIES_IN_LIST,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWED_MOVIES: `RESET_SHOWED_MOVIES`,
  GET_ACTIVE_MOVIE: `GET_ACTIVE_MOVIE`,
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
  }),

  getActiveMovie: (movie) => {
    return {
      type: ActionType.GET_ACTIVE_MOVIE,
      payload: movie
    };
  },
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

    case ActionType.GET_ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: action.payload
      });

    default: return state;
  }
};

export {reducer, ActionType, ActionCreator};
