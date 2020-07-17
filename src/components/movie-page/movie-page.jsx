import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import withActiveCard from "../../hocs/with-active-card.js";

import {TabType} from "../../consts.js";
import {getSimilarMovies} from "../../utils.js";

const MoviesListWrapped = withActiveCard(MoviesList);


export class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this._renderActiveTab = this._renderActiveTab.bind(this);
  }

  _renderActiveTab() {
    const {genre, year, ratingScore, ratingCount, description, director, starring, runTime, reviews, activeTab} = this.props;

    switch (activeTab) {
      case TabType.OVERVIEW:
        return <MovieOverview
          ratingScore={ratingScore}
          ratingCount={ratingCount}
          description={description}
          director={director}
          starring={starring}
        />;

      case TabType.DETAILS:
        return <MovieDetails
          director={director}
          starring={starring}
          genre={genre}
          year={year}
          runTime={runTime}
        />;

      case TabType.REVIEWS:
        return <MovieReviews
          reviews={reviews}
        />;

      default:
        return null;
    }
  }

  render() {
    const {background, title, genre, year, posterBig, renderTabs, onTitleClick, onPosterClick} = this.props;
    const similarMovies = getSimilarMovies(this.props.movies, genre);

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={background} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <div className="user-block">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterBig} alt={title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                {renderTabs()}
                {this._renderActiveTab()}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesListWrapped
              movies={similarMovies}
              onTitleClick={onTitleClick}
              onPosterClick={onPosterClick}
            />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}


MoviePage.propTypes = {
  background: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  posterBig: PropTypes.string.isRequired,
  ratingScore: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.string.isRequired,
  runTime: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired
      })
  ).isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onPosterClick: PropTypes.func.isRequired,
  renderTabs: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies
});


export default connect(mapStateToProps)(MoviePage);
