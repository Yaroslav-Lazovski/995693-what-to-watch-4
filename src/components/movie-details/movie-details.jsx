import React from "react";
import PropTypes from "prop-types";


const MovieDetails = (props) => {
  const {director, starring, runTime, genre, year} = props;

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">{starring}</span>
        </p>
      </div>
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{runTime}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{year}</span>
        </p>
      </div>
    </div>
  );
};


MovieDetails.propTypes = {
  director: PropTypes.string.isRequired,
  starring: PropTypes.string.isRequired,
  runTime: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};


export default MovieDetails;

