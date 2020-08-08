import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Operation as DataOperation} from "../../reducer/data/data";
import {getFavoriteMovies} from "../../reducer/data/selectors";

import MoviesList from "../movies-list/movies-list.jsx";
import Footer from "../footer/footer.jsx";
import withActiveCard from "../../hocs/with-active-card";

import {AppRoute} from "../../consts";

export const MoviesListWrapped = withActiveCard(MoviesList);

export class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavoriteMovies} = this.props;

    loadFavoriteMovies();
  }

  render() {
    const {movies} = this.props;

    return (
      <>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <h1 className="page-title user-page__title">My list</h1>
          <div className="user-block">
            <div className="user-block__avatar">
              <Link to={AppRoute.MY_LIST}>
                <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </Link>
            </div>
          </div>
        </header>
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MoviesListWrapped
            movies={movies}
          />
        </section>

        <Footer />
      </div>
    </>);
  }
}
MyList.propTypes = {
  loadFavoriteMovies: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        // title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        runTime: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        background: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        ratingScore: PropTypes.number.isRequired,
        ratingCount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ).isRequired,
      }).isRequired
  ).isRequired,
};
const mapStateToProps = (state) => ({
  movies: getFavoriteMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies() {
    dispatch(DataOperation.loadFavoriteMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
