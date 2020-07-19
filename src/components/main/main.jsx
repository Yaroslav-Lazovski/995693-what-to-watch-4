import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import FullScreenPlayer from "../full-screen-player/full-screen-player.jsx";
import ShowMore from "../show-more/show-more.jsx";
import withActiveCard from "../../hocs/with-active-card.js";
import withFullScreenPlayer from "../../hocs/with-full-screen-player.js";

import {ActionCreator} from "../../reducer.js";

const MoviesListWrapped = withActiveCard(MoviesList);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);


export class Main extends PureComponent {
  constructor(props) {
    super(props);

    this._onFullScreenToggle = this._onFullScreenToggle.bind(this);
  }

  _onFullScreenToggle() {
    this.props.setFullScreenPlayer(!this.props.isPlayerActive);
  }


  render() {
    const {movie: {year, title, genre}, onTitleClick, onPosterClick, onFullScreenToggle, isPlayerActive} = this.props;
    const showedMovies = this.props.movies.slice(0, this.props.showedMoviesNumber);


    return (
      isPlayerActive ? (
        <FullScreenPlayerWrapped />
      ) :
        (<React.Fragment>
          <section className="movie-card">
            <div className="movie-card__bg">
              <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a className="logo__link">
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
              <div className="movie-card__info">
                <div className="movie-card__poster">
                  <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
                </div>

                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{genre}</span>
                    <span className="movie-card__year">{year}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <button onClick={onFullScreenToggle} className="btn btn--play movie-card__button" type="button">
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
                onTitleClick={onTitleClick}
                onPosterClick={onPosterClick}
              />

              {this.props.showedMoviesNumber < this.props.movies.length && <ShowMore
                onShowMoreButtonClick={this.props.onShowMoreButtonClick}
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
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  showedMoviesNumber: PropTypes.number.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onPosterClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  isPlayerActive: PropTypes.bool.isRequired,
  setFullScreenPlayer: PropTypes.func.isRequired,
  onFullScreenToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  movies: state.movies,
  showedMoviesNumber: state.showedMoviesNumber,
  isPlayerActive: state.isPlayerActive,
});


const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  },

  setFullScreenPlayer(state) {
    dispatch(ActionCreator.setFullScreenPlayer(state));
  },

  onFullScreenToggle() {
    dispatch(ActionCreator.setFullScreenPlayer(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
