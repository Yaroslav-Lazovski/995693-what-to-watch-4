import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import AddMyList from "../add-my-list/add-my-list.jsx";
import withActiveCard from "../../hocs/with-active-card.js";

import {ActionCreator} from "../../reducer/state/state.js";
import {getPromoMovie, getLoadingFavoriteMovie} from "../../reducer/data/selectors";
import {Operation as DataOperation} from '../../reducer/data/data';
import {getShowedMovies, getFilteredMovies} from "../../reducer/state/selectors.js";
import {AppRoute} from "../../consts";

const MoviesListWrapped = withActiveCard(MoviesList);


export const Main = (props) => {
  const {movie: {id, year, title, genre, background, posterBig, isFavorite}, movies, showedMoviesNumber, onShowMoreButtonClick, isLoadingFavoriteMovie, loadPromoMovie} = props;
  const showedMovies = movies.slice(0, showedMoviesNumber);


  if (isLoadingFavoriteMovie) {
    loadPromoMovie();
  }

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
                <AddMyList
                  id={id}
                  isFavorite={isFavorite}
                />
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

        <Footer />
      </div>
    </React.Fragment>)
  );
};


Main.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
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
  isLoadingFavoriteMovie: PropTypes.bool.isRequired,
  loadPromoMovie: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movie: getPromoMovie(state),
  movies: getFilteredMovies(state),
  showedMoviesNumber: getShowedMovies(state),
  isLoadingFavoriteMovie: getLoadingFavoriteMovie(state)
});


const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  },

  loadPromoMovie() {
    dispatch(DataOperation.loadPromoMovie());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
