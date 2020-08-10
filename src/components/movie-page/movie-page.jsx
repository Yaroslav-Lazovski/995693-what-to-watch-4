import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import MoviesList from "../movies-list/movies-list.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import AddMyList from "../add-my-list/add-my-list.jsx";
import withActiveCard from "../../hocs/with-active-card.js";

import {ActionCreator} from "../../reducer/state/state";
import {getSelectedMovie} from "../../reducer/state/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {getLoadingFavoriteMovie} from '../../reducer/data/selectors';
import {Operation as DataOperation} from '../../reducer/data/data';
import {AppRoute, TabType, MAX_SIMILAR_MOVIES} from "../../consts.js";

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

  _getSimilarMovies(movies, genre) {
    return movies.filter((movie) => movie.genre === genre).slice(0, MAX_SIMILAR_MOVIES);
  }

  render() {
    const {movie: {id, background, title, genre, year, posterBig, isFavorite}, renderTabs, isLoadingFavoriteMovie, loadMovies} = this.props;
    const similarMovies = this._getSimilarMovies(this.props.movies, genre);

    if (isLoadingFavoriteMovie) {
      loadMovies();
    }

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={background} alt={title}/>
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <Header />
            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
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
                  <AddMyList
                    id={id}
                    isFavorite={isFavorite}
                  />
                  <Link
                    to={`${AppRoute.FILM}/${id}${AppRoute.ADD_REVIEW}`}
                    className="btn movie-card__button">
                    Add review
                  </Link>
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
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesListWrapped
              movies={similarMovies}
            />
          </section>
          <Footer />
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
    isFavorite: PropTypes.bool.isRequired,
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
  setActiveMovie: PropTypes.func.isRequired,
  isLoadingFavoriteMovie: PropTypes.bool.isRequired,
  loadMovies: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  movie: getSelectedMovie(state, props.id),
  movies: getMovies(state),
  authorizationStatus: getAuthorizationStatus(state),
  isLoadingFavoriteMovie: getLoadingFavoriteMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveMovie(movie) {
    dispatch(ActionCreator.getActiveMovie(movie));
  },

  loadMovies() {
    dispatch(DataOperation.loadMovies());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
