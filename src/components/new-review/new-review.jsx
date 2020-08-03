import React, {Fragment} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {getSelectedMovie} from "../../reducer/state/selectors.js";

const ReviewLength = {
  MIN: 50,
  MAX: 400
};

const RATING_COUNT = 5;


export const NewReview = (props) => {
  const {movie: {title, background, poster}, onChangeHandler, onSubmitHandler} = props;

  const getRatingItem = (item, index) => {
    const id = `star-${index + 1}`;

    return (
      <Fragment key={item + id}>
        <input
          onChange={onChangeHandler}
          className="rating__input"
          id={id}
          type="radio"
          name="rating"
          value={index}
        />
        <label className="rating__label" htmlFor={id}>Rating {index}</label>
      </Fragment>
    );
  };

  const ratingStars = new Array(RATING_COUNT).fill(``);

  const renderRatingMarkup = () => ratingStars.map(getRatingItem);

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={background} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{title}</a>
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
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {renderRatingMarkup()}
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              onChange={onSubmitHandler}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={ReviewLength.MIN}
              maxLength={ReviewLength.MAX}
              required
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

NewReview.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  onSubmitHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movie: getSelectedMovie(state)
});

export default connect(mapStateToProps)(NewReview);
