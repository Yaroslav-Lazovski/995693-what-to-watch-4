import NameSpace from "../name-space";
import {getGenresList} from "../../utils";

export const getMovies = (state) => state[NameSpace.DATA].movies;

export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;

export const getAllGenres = (state) => getGenresList(state[NameSpace.DATA].movies);

export const getComments = (state) => state[NameSpace.DATA].reviews;

export const getFormState = (state) => state[NameSpace.STATE].isFormDisabled;

export const getLoadingMoviesState = (state) => state[NameSpace.STATE].isLoadingMovies;

export const getLoadingPromoMovieState = (state) => state[NameSpace.STATE].isLoadingPromoMovie;

export const getLoadingCommentsState = (state) => state[NameSpace.STATE].isLoadingComments;

export const getErrorStatus = (state) => state[NameSpace.STATE].isErrorLoading;
