import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.js";

import films from "../../mocks/films.js";
import movieOverview from "../../mocks/movie.js";
import reviews from "../../mocks/reviews.js";


const promoInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const MoviePageWrapped = withTabs(MoviePage);


class App extends PureComponent {
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
    return (
      <Main
        promoTitle={promoInfo.title}
        promoGenre={promoInfo.genre}
        promoYear={promoInfo.year}
        movies={films}
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderMoviePage() {
    const {movieBackground, movieTitle, movieGenre, movieYear, moviePoster, movieRatingScore,
      movieRatingCount, movieDescription, movieDirector, movieStarring, movieRunTime} = movieOverview;

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
        movies={films}
        reviews={reviews}
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderApp() {
    const {activeMovie} = this.state;

    if (activeMovie) {
      return this._renderMoviePage();
    }

    return this._renderMain();
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


const mapStateToProps = (state) => ({
  movies: state.movies
});

export {App};
export default connect(mapStateToProps)(App);
