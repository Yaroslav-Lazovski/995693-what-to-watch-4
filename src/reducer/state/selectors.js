import {createSelector} from "reselect";

import {getMovies} from '../data/selectors.js';
import NameSpace from "../name-space.js";

export const getCurrentGenre = (state) => state[NameSpace.STATE].genre;

export const getShowedMovies = (state) => state[NameSpace.STATE].showedMoviesNumber;

export const getPlayerState = (state) => state[NameSpace.STATE].isPlayerActive;

export const getActiveMovieId = (state) => state[NameSpace.STATE].activeMovie;

export const getSelectedMovie = createSelector(
    getMovies,
    getActiveMovieId,
    (movies, id) => {
      return movies.find((movie) => movie.id === id);
    }
);
