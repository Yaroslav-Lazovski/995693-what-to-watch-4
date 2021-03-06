import {createSelector} from "reselect";

import {getMovies} from "../data/selectors.js";
import NameSpace from "../name-space.js";

import {GENRES} from "../../consts.js";

export const getCurrentGenre = (state) => state[NameSpace.STATE].genre;

export const getShowedMovies = (state) => state[NameSpace.STATE].showedMoviesNumber;

export const getActiveMovie = (state) => state[NameSpace.STATE].activeMovie;

export const getSelectedMovie = (state, id) => {
  const movies = getMovies(state);

  return movies.find((movie) => movie.id === id && movie);
};


export const getFilteredMovies = createSelector(
    getMovies,
    getCurrentGenre,
    (movies, genre) => {
      return (genre === GENRES.ALL) ? movies : movies.filter((movie) => movie.genre === genre);
    }
);
