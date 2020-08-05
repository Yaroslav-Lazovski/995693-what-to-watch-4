import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import Header from "../header/header.jsx";
import withActiveCard from "../../hocs/with-active-card.js";

import {ActionCreator} from "../../reducer/state/state.js";
import {getPromoMovie} from "../../reducer/data/selectors";
import {getShowedMovies, getFilteredMovies} from "../../reducer/state/selectors.js";
import {AppRoute} from "../../consts";

const MoviesListWrapped = withActiveCard(MoviesList);


export class Main extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const {movie: {id, year, title, genre, background, posterBig}, movies, showedMoviesNumber, onShowMoreButtonClick} = this.props;
    const showedMovies = movies.slice(0, showedMoviesNumber);

    return (
      (<React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={posterBig} alt={title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link to={`${AppRoute.PLAYER}/${id}`} className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresList />

            <MoviesListWrapped
              movies={showedMovies}
            />

            {showedMoviesNumber < movies.length && <ShowMore
              onShowMoreButtonClick={onShowMoreButtonClick}
            />}
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
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
      </React.Fragment>)
    );
  }
}


Main.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  showedMoviesNumber: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: getPromoMovie(state),
  movies: getFilteredMovies(state),
  showedMoviesNumber: getShowedMovies(state),
});


const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
