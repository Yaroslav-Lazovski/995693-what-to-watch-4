import React from "react";
import PropTypes from "prop-types";

import {formatRating, getRatingLevel} from "../../utils.js";

const MovieOverview = (props) => {
  const {ratingScore, ratingCount, description, director, starring} = props;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{formatRating(ratingScore)}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingLevel(ratingScore)}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};


MovieOverview.propTypes = {
  ratingScore: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
};

export default MovieOverview;
