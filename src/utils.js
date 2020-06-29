import {MovieRating, RatingType} from "../src/consts.js";

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
