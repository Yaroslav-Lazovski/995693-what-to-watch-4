import movies from "./mocks/films.js";
import {extend} from "./utils.js";
import {GENRES} from "./consts.js";


const initialState = {
  genre: GENRES.ALL,
  movies
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  changeGenre: (genre)=>({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });

    default: return state;
  }
};

export {reducer, ActionType, ActionCreator};
