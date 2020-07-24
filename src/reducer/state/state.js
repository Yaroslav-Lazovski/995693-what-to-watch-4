import {extend} from "../../utils.js";
import {GENRES, MAX_MOVIES_IN_LIST} from "../../consts.js";


const initialState = {
  genre: GENRES.ALL,
  showedMoviesNumber: MAX_MOVIES_IN_LIST,
  isPlayerActive: false,
  activeMovie: -1,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWED_MOVIES: `RESET_SHOWED_MOVIES`,
  SET_FULLSCREEN_PLAYER: `SET_FULLSCREEN_PLAYER`,
  GET_ACTIVE_MOVIE_ID: `GET_ACTIVE_MOVIE_ID`,
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

  setFullScreenPlayer: (state) => ({
    type: ActionType.SET_FULLSCREEN_PLAYER,
    payload: state
  }),

  getActiveMovieId: (id) => {
    return {
      type: ActionType.GET_ACTIVE_MOVIE_ID,
      payload: id
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

    case ActionType.SET_FULLSCREEN_PLAYER:
      return extend(state, {
        isPlayerActive: action.payload
      });

    case ActionType.GET_ACTIVE_MOVIE_ID:
      return extend(state, {
        activeMovie: action.payload
      });

    default: return state;
  }
};

export {reducer, ActionType, ActionCreator};
