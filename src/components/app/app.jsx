import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.js";

import {ActionCreator} from "../../reducer/state/state.js";
import {getSelectedMovie} from "../../reducer/state/selectors";

import reviews from "../../mocks/reviews.js";


const MoviePageWrapped = withTabs(MoviePage);


export class App extends PureComponent {
  constructor(props) {
    super(props);


    this._handleMovieTitleClick = this._handleMovieTitleClick.bind(this);
  }

  _handleMovieTitleClick(id) {
    this.props.onMovieTitleClick(id);
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
    return (
      <MoviePageWrapped
        reviews={reviews}
        onTitleClick={this._handleMovieTitleClick}
        onPosterClick={this._handleMovieTitleClick}
      />
    );
  }

  _renderApp() {
    const {activeMovie} = this.props;

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

App.propTypes = {
  activeMovie: PropTypes.shape({
    background: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    runTime: PropTypes.number.isRequired,
  }),
  onMovieTitleClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  activeMovie: getSelectedMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieTitleClick(id) {
    dispatch(ActionCreator.getActiveMovieId(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
