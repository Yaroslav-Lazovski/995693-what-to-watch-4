import NameSpace from "../name-space";
import {getGenresList} from "../../utils";

export const getMovies = (state) => state[NameSpace.DATA].movies;

export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;

export const getAllGenres = (state) => getGenresList(state[NameSpace.DATA].movies);

export const getComments = (state) => state[NameSpace.DATA].reviews;

export const getFormState = (state) => state[NameSpace.DATA].isFormDisabled;

export const getLoadingMoviesState = (state) => state[NameSpace.DATA].isLoadingMovies;

export const getLoadingPromoMovieState = (state) => state[NameSpace.DATA].isLoadingPromoMovie;

export const getLoadingCommentsState = (state) => state[NameSpace.DATA].isLoadingComments;

export const getErrorStatus = (state) => state[NameSpace.DATA].isErrorLoading;

export const getFavoriteMovies = (state) => state[NameSpace.DATA].favoriteMovies;

export const getLoadingFavoriteMovie = (state) => state[NameSpace.DATA].isLoadingFavoriteMovie;
