import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.js";

import movieOverview from "../../mocks/movie.js";
import reviews from "../../mocks/reviews.js";


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
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderMoviePage() {
    const {background, title, genre, year, poster, ratingScore,
      ratingCount, description, director, starring, runTime} = movieOverview;

    return (
      <MoviePageWrapped
        background={background}
        title={title}
        genre={genre}
        year={year}
        poster={poster}
        ratingScore={ratingScore}
        ratingCount={ratingCount}
        description={description}
        director={director}
        starring={starring}
        runTime={runTime}
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
        background={activeMovie.background}
        title={activeMovie.title}
        genre={activeMovie.genre}
        year={activeMovie.year}
        poster={activeMovie.poster}
        posterBig={activeMovie.posterBig}
        ratingScore={activeMovie.ratingScore}
        ratingCount={activeMovie.ratingCount}
        description={activeMovie.description}
        director={activeMovie.director}
        starring={activeMovie.starring}
        runTime={activeMovie.runTime}
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
