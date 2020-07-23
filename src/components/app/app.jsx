import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.js";

import {getSelectedMovie} from "../../reducer/state/selectors";

import reviews from "../../mocks/reviews.js";


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
    return (
      <Main
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderMoviePage() {
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

  _renderApp() {
    const {activeMovie} = this.state;

    if (!activeMovie) {
      return this._renderMain();
    }

    return this._renderMoviePage();
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
  activeMovie: getSelectedMovie(state),
});

export default connect(mapStateToProps)(App);
