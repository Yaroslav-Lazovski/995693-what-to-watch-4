import {MovieRating, RatingType} from "../src/consts.js";

const MAX_SIMILAR_MOVIES = 4;

export const formatRating = (rating) => rating.toString().replace(`.`, `,`);

export const getRatingLevel = (rating) => {
  let textRating;

  if (rating >= MovieRating.BAD && rating < MovieRating.NORMAL) {
    textRating = RatingType.BAD;
  } else if (rating >= MovieRating.NORMAL && rating < MovieRating.GOOD) {
    textRating = RatingType.NORMAL;
  } else if (rating >= MovieRating.GOOD && rating < MovieRating.VERY_GOOD) {
    textRating = RatingType.GOOD;
  } else if (rating >= MovieRating.VERY_GOOD && rating < MovieRating.AWESOME) {
    textRating = RatingType.VERY_GOOD;
  } else if (rating === MovieRating.AWESOME) {
    textRating = RatingType.AWESOME;
  }

  return textRating;
};

export const getSimilarMovies = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre).slice(0, MAX_SIMILAR_MOVIES);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
