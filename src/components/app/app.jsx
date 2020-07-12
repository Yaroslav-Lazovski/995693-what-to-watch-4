import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";

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
        reviews={reviews}
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderApp() {
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


export default App;
