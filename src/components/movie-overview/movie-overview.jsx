import React from "react";
import PropTypes from "prop-types";

import {formatRating, getRatingLevel} from "../../utils.js";

const MovieOverview = (props) => {
  const {movieRatingScore, movieRatingCount, movieDescription, movieDirector, movieStarring} = props;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{formatRating(movieRatingScore)}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingLevel(movieRatingScore)}</span>
          <span className="movie-rating__count">{movieRatingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{movieDescription}</p>

        <p className="movie-card__director"><strong>{movieDirector}</strong></p>

        <p className="movie-card__starring"><strong>{movieStarring} and other</strong></p>
      </div>
    </React.Fragment>
  );
};


MovieOverview.propTypes = {
  movieRatingScore: PropTypes.number.isRequired,
  movieRatingCount: PropTypes.number.isRequired,
  movieDescription: PropTypes.string.isRequired,
  movieDirector: PropTypes.string.isRequired,
  movieStarring: PropTypes.string.isRequired,
};

export default MovieOverview;
