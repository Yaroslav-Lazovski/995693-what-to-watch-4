import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = (props) => {
  const {movie, onTitleClick, onMouseEnter} = props;
  const {title, poster} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onMouseEnter(title)}
    >
      <div className="small-movie-card__image">
        <img src={poster} alt={title} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={onTitleClick}
      >
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired
};

export default SmallMovieCard;
