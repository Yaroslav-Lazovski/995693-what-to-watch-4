import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import MoviesList from "../movies-list/movies-list.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import Header from "../header/header.jsx";
import withActiveCard from "../../hocs/with-active-card.js";

import {ActionCreator} from "../../reducer/state/state";
import {getSelectedMovie, getSimilarMovies} from "../../reducer/state/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AppRoute, TabType, AuthorizationStatus} from "../../consts.js";

const MoviesListWrapped = withActiveCard(MoviesList);


export class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this._renderActiveTab = this._renderActiveTab.bind(this);
  }

  componentDidMount() {
    const {movie, setActiveMovie} = this.props;

    setActiveMovie(movie);
  }

  componentDidUpdate() {
    const {movie, setActiveMovie} = this.props;

    setActiveMovie(movie);
  }

  _renderAddReviewButton(status, id) {
    return status === AuthorizationStatus.AUTH ?
      <Link to={`${AppRoute.FILM}/${id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link>
      : null;
  }

  _renderActiveTab() {
    const {movie: {genre, year, ratingScore, ratingCount, description, director, starring, runTime}, activeTab} = this.props;

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
        return <MovieReviews />;

      default:
        return null;
    }
  }

  _renderSimilarMovies() {
    const {movies} = this.props;

    return movies.length > 0 ? (
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <MoviesListWrapped
          movies={movies}
        />
      </section>
    ) : null;
  }

  render() {
    const {movie: {id, background, title, genre, year, posterBig}, renderTabs, authorizationStatus} = this.props;

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={background} alt={name}/>
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <Header />
            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>
                <div className="movie-card__buttons">
                  <Link to={`${AppRoute.PLAYER}/${id}`} className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
                    <span>My list</span>
                  </button>
                  {this._renderAddReviewButton(authorizationStatus, id)}
                </div>
              </div>
            </div>
          </div>
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterBig} alt={title} width="218" height="327"/>
              </div>
              <div className="movie-card__desc">
                {renderTabs()}
                {this._renderActiveTab()}
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          {this._renderSimilarMovies()}
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
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
    starring: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    runTime: PropTypes.number.isRequired,
  }),
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired
      })
  ).isRequired,
  renderTabs: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  setActiveMovie: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  movie: getSelectedMovie(state, props.id),
  movies: getSimilarMovies(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveMovie(movie) {
    dispatch(ActionCreator.getActiveMovie(movie));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
