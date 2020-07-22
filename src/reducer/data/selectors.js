import NameSpace from "../name-space";
import {getGenresList} from "../../utils";

export const getMovies = (state) => state[NameSpace.DATA].movies;

export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;

export const getAllGenres = (state) => getGenresList(state[NameSpace.DATA].movies);
