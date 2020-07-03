import movies from "./mocks/films.js";
import {extend} from "./utils.js";
import {GENRES} from "./consts.js";


const initialState = {
  genre: GENRES.ALL,
  movies
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
};

const ActionCreator = {
  changeGenre: (genre)=>({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  filteredFilms: ()=>({
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: null
  })
};

const getFilteredMovies = (genre) => {
  const allMovies = initialState.movies;

  if (genre === GENRES.ALL) {
    return allMovies;
  }

  const filteredMovies = allMovies.filter((movie) => movie.genre === genre);

  return filteredMovies;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.GET_MOVIES_BY_GENRE:
      const filteredFilms = getFilteredMovies(state.genre, initialState.films);
      return extend(state, {
        films: filteredFilms
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
