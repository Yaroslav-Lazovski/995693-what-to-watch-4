import React from "react";
import PropTypes from "prop-types";

import {getFormatRating, getFormatDate, getFormatInnerDate} from "../../utils";
import {dateOptions, dateInnerOptions} from "../../consts";


const MovieReview = (props) => {
  const {review: {user: {name}, date, rating, comment}} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={getFormatInnerDate(date, dateInnerOptions)}>
            {getFormatDate(date, dateOptions)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{getFormatRating(rating)}</div>
    </div>
  );
};

MovieReview.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired
};


export default MovieReview;
