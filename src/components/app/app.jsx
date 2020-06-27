import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

import films from "../../mocks/films.js";
import movieOverview from "../../mocks/movie.js";


const promoInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null
    };

    this._handleMovieTitleClick = this._handleMovieTitleClick.bind(this);
  }

  _handleMovieTitleClick(movie) {
    this.setState({
      activeMovie: movie
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
    const {movieBackground, movieTitle, movieGenre, movieYear, moviePoster, movieRatingScore, movieRatingLevel,
      movieRatingCount, movieDescription, movieDirector, movieStarring} = movieOverview;

    return (
      <MoviePage
        movieBackground={movieBackground}
        movieTitle={movieTitle}
        movieGenre={movieGenre}
        movieYear={movieYear}
        moviePoster={moviePoster}
        movieRatingScore={movieRatingScore}
        movieRatingLevel={movieRatingLevel}
        movieRatingCount={movieRatingCount}
        movieDescription={movieDescription}
        movieDirector={movieDirector}
        movieStarring={movieStarring}
      />
    );
  }


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMain()}
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
