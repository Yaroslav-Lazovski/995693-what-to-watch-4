import React from "react";
import PropTypes from "prop-types";

import MovieReview from "../movie-review/movie-review.jsx";


const MovieReviews = (props) => {
  const {reviews} = props;

  const renderReviews = () => reviews.map((review) => (
    <MovieReview
      key={review + review.id}
      review={review}
    />
  ));

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {renderReviews()}
      </div>
    </div>
  );
};


MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      }).isRequired
  ).isRequired,
};


export default MovieReviews;

