import React, {Fragment} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {getSelectedMovie} from "../../reducer/state/selectors.js";
import {getErrorStatus, getFormState} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../consts.js";

const ReviewLength = {
  MIN: 50,
  MAX: 400
};

const RATING_COUNT = 5;


export const NewReview = (props) => {
  const {movie: {id, title, background, poster}, rating, isFormDisabled, isErrorLoading, onRatingChange, onCommentChange, onSubmit} = props;

  const getRatingItem = (item, index) => {
    const key = `star-${index + 1}`;

    return (
      <Fragment key={key}>
        <input
          onChange={onRatingChange}
          className="rating__input"
          id={key}
          type="radio"
          name="rating"
          value={index + 1}
          disabled={isFormDisabled}
        />
        <label className="rating__label" htmlFor={key}>Rating {index}</label>
      </Fragment>
    );
  };

  const ratingStars = new Array(RATING_COUNT).fill(``);

  const renderRatingMarkup = () => ratingStars.map(getRatingItem);

  const getErrorMessage = () => {
    return isErrorLoading ? (
      <p style={{color: `red`, textAlign: `center`}}>Sending error. Please, try again.</p>
    ) : null;
  };

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={background} alt={title}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FILM}/${id}`} className="breadcrumbs__link">{title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={poster} alt={`${title} poster`} width="218" height="327"/>
        </div>
      </div>
      <div className="add-review">
        <p style={{color: `red`, textAlign: `center`}}>{getErrorMessage()}</p>
        <form onSubmit={onSubmit} action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {renderRatingMarkup()}
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              onChange={onCommentChange}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={ReviewLength.MIN}
              maxLength={ReviewLength.MAX}
              required
              disabled={isFormDisabled}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={isFormDisabled || (rating === 0)}>
              Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

NewReview.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }).isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  isErrorLoading: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired
};

const mapStateToProps = (state, props) => ({
  movie: getSelectedMovie(state, props.id),
  isErrorLoading: getErrorStatus(state),
  isFormDisabled: getFormState(state)
});

export default connect(mapStateToProps)(NewReview);
