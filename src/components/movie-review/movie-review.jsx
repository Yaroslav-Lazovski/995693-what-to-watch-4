import React from "react";
import PropTypes from "prop-types";


const MovieReview = (props) => {
  const {review: {text, author, date, rating}} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{text}</p>
        <footer className="review__details">
          <cite className="review__author">{author}</cite>
          <time className="review__date" dateTime="2016-12-24">{date}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
};


MovieReview.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired
};


export default MovieReview;
