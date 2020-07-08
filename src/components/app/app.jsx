import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.js";

import movieOverview from "../../mocks/movie.js";
import reviews from "../../mocks/reviews.js";


const promoInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const MoviePageWrapped = withTabs(MoviePage);


export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null
    };

    this._handleMovieTitleClick = this._handleMovieTitleClick.bind(this);
  }

  _handleMovieTitleClick(id) {
    this.setState({
      activeMovie: id
    });
  }

  _renderMain() {
    const {movies} = this.props;
    return (
      <Main
        promoTitle={promoInfo.title}
        promoGenre={promoInfo.genre}
        promoYear={promoInfo.year}
        movies={movies}
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderMoviePage() {
    const {movieBackground, movieTitle, movieGenre, movieYear, moviePoster, movieRatingScore,
      movieRatingCount, movieDescription, movieDirector, movieStarring, movieRunTime} = movieOverview;
    const {movies} = this.props;

    return (
      <MoviePageWrapped
        movieBackground={movieBackground}
        movieTitle={movieTitle}
        movieGenre={movieGenre}
        movieYear={movieYear}
        moviePoster={moviePoster}
        movieRatingScore={movieRatingScore}
        movieRatingCount={movieRatingCount}
        movieDescription={movieDescription}
        movieDirector={movieDirector}
        movieStarring={movieStarring}
        movieRunTime={movieRunTime}
        movies={movies}
        reviews={reviews}
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderApp() {
    const {movies} = this.props;
    const {activeMovie} = this.state;

    if (!activeMovie) {
      return this._renderMain();
    }

    return (
      <MoviePageWrapped
        movieBackground={activeMovie.background}
        movieTitle={activeMovie.title}
        movieGenre={activeMovie.genre}
        movieYear={activeMovie.year}
        moviePoster={activeMovie.poster}
        moviePosterBig={activeMovie.posterBig}
        movieRatingScore={activeMovie.ratingScore}
        movieRatingCount={activeMovie.ratingCount}
        movieDescription={activeMovie.description}
        movieDirector={activeMovie.director}
        movieStarring={activeMovie.starring}
        movieRunTime={activeMovie.runTime}
        movies={movies}
        reviews={reviews}
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderMoviePage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};


const mapStateToProps = (state) => ({
  movies: state.movies
});

export default connect(mapStateToProps)(App);
