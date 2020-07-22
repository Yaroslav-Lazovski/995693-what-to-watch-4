import NameSpace from "../name-space";

export const getCurrentGenre = (state) => state[NameSpace.STATE].genre;

export const getShowedMovies = (state) => state[NameSpace.STATE].showedMoviesNumber;

export const getPlayerState = (state) => state[NameSpace.STATE].isPlayerActive;
